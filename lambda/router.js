const { URL } = require("url");
const express = require("express");
const beautifyHtml = require("js-beautify").html;
const Octokit = require("@octokit/rest");
const axios = require("axios");
const packageInfo = require("../package.json");
const {
    githubToken,
    repoOwner,
    githubRef,
    otpServiceUrl,
    repoName
} = require("./config");
const lib = require("./lib");

const octokit = new Octokit({
    auth: githubToken
});
const router = express.Router();

router.get("/", (req, res) =>
    res.json({
        version: packageInfo.version
    })
);

router.post("/request-otp", async (req, res) => {
    const postBody = req.body;
    if (!postBody.email) {
        res.status(400).json({
            error: "The email parameter is missing."
        });
        return;
    }

    try {
        let endpoint = new URL("/otp/get", otpServiceUrl);
        let response = await axios.post(endpoint.href, {
            email: postBody.email
        });

        res.json(response.data);
    } catch (err) {
        res.status(500).json({
            error: err.message || "Error requesting for email verification OTP."
        });
    }
});

router.post("/submit-product-changes", async (req, res) => {
    let postBody = req.body;

    let missingParams = lib.getMissingParams(
        [
            "contributor",
            "otp",
            "page_path",
            "page_title",
            "page_category",
            "page_content",
            "page_layout"
        ],
        postBody
    );
    if (missingParams.length > 0) {
        res.status(400).json({
            error: `The following parameters are missing: ${missingParams.join(
                ", "
            )}`
        });
        return;
    }

    let contributor = postBody.contributor;
    let otp = postBody.otp;

    try {
        let endpoint = new URL("/otp/validate", otpServiceUrl);
        await axios.post(endpoint.href, {
            email: contributor,
            otp: otp
        });
    } catch (err) {
        res.status(403).json({
            error: "OTP validation failed."
        });
        return;
    }

    let path = postBody.page_path;
    let title = postBody.page_title;
    let category = postBody.page_category;
    let content = postBody.page_content;
    let layout = postBody.page_layout;

    let newPage =
        `---\n` +
        `title: ${title}\n` +
        `layout: ${layout}\n` +
        `permalink: ${path}\n` +
        `category: ${category}\n` +
        `breadcrumb: ${title.toUpperCase()}\n` +
        `---\n`;

    const formattedContent = beautifyHtml(content, {
        wrap_line_length: 120
    });
    newPage += formattedContent;

    try {
        const baseRef = await octokit.git.getRef({
            owner: repoOwner,
            repo: repoName,
            ref: `heads/${githubRef}`
        });

        const newBranchId = await lib.generateId();
        const newBranchName = `product-edits-${new Date()
            .toISOString()
            .substring(0, 10)}-${newBranchId}`;
        const newRefName = `heads/${newBranchName}`;
        const newRef = await octokit.git.createRef({
            owner: repoOwner,
            repo: repoName,
            ref: "refs/" + newRefName,
            sha: baseRef.data.object.sha
        });

        const newBlob = await octokit.git.createBlob({
            owner: repoOwner,
            repo: repoName,
            content: newPage
        });

        const currentCommit = await octokit.git.getCommit({
            owner: repoOwner,
            repo: repoName,
            commit_sha: baseRef.data.object.sha
        });

        // post new tree object with file path pointer replaced with new blob SHA => tree SHA
        const newTree = await octokit.git.createTree({
            owner: repoOwner,
            repo: repoName,
            tree: [
                {
                    path: "contents" + path + "index.html",
                    mode: "100644",
                    type: "blob",
                    sha: newBlob.data.sha
                }
            ],
            base_tree: currentCommit.data.tree.sha
        });

        // create new commit with current commit SHA as parent and new tree SHA => commit SHA
        const newCommit = await octokit.git.createCommit({
            owner: repoOwner,
            repo: repoName,
            message: `New edits for ${title} page from ${contributor}`,
            tree: newTree.data.sha,
            parents: [currentCommit.data.sha]
        });

        // update ref to point to commit SHA
        const updateRefResults = await octokit.git.updateRef({
            owner: repoOwner,
            repo: repoName,
            ref: newRefName,
            sha: newCommit.data.sha
        });

        const prResults = await octokit.pulls.create({
            owner: repoOwner,
            repo: repoName,
            title: `New edits for ${title} page from ${contributor}`,
            head: newBranchName,
            base: githubRef,
            body: newPage,
            maintainer_can_modify: true
        });

        res.json({
            pr: prResults.data.html_url
        });
    } catch (err) {
        res.status(500).json({
            error: err.message || "Error submitting contributions."
        });
    }
});

router.post("/terms", async (req, res) => {
    let submission = req.body;
    let missingParams = lib.getMissingParams(
        [
            "contributor",
            "contributor_email",
            "term",
            "full_term",
            "description"
        ],
        submission
    );
    if (missingParams.length > 0) {
        res.status(400).json({
            error: `The following parameters are missing: ${missingParams.join(
                ", "
            )}`
        });
        return;
    }

    let response = await octokit.repos.getContents({
        owner: repoOwner,
        repo: repoName,
        path: "terms.json",
        ref: githubRef
    });

    let termsFileRaw = Buffer.from(response.data.content, "base64").toString();
    let termsJson = termsFileRaw
        .split("\n")
        .slice(2)
        .join("\n");
    let existingTerms = JSON.parse(termsJson);

    let newTerm = {
        term: submission.term,
        full_term: submission.full_term,
        description: submission.description,
        link: submission.link || "",
        categories:
            submission.categories.length > 0 ? submission.categories : []
    };

    existingTerms.push(newTerm);
    lib.sortTerms(existingTerms);

    let newContent = "---\n" + "---\n" + JSON.stringify(existingTerms, null, 4);

    const baseRef = await octokit.git.getRef({
        owner: repoOwner,
        repo: repoName,
        ref: `heads/${githubRef}`
    });

    const newBranchId = await lib.generateId();
    const newBranchName = `term-new-${new Date()
        .toISOString()
        .substring(0, 10)}-${newBranchId}`;
    const newRefName = `heads/${newBranchName}`;
    const newRef = await octokit.git.createRef({
        owner: repoOwner,
        repo: repoName,
        ref: "refs/" + newRefName,
        sha: baseRef.data.object.sha
    });

    // post new blob object with new content => blob SHA
    const newBlob = await octokit.git.createBlob({
        owner: repoOwner,
        repo: repoName,
        content: newContent
    });

    // get current commit => commit object {tree: {url, sha}}
    const currentCommit = await octokit.git.getCommit({
        owner: repoOwner,
        repo: repoName,
        commit_sha: baseRef.data.object.sha
    });

    // post new tree object with file path pointer replaced with new blob SHA => tree SHA
    const newTree = await octokit.git.createTree({
        owner: repoOwner,
        repo: repoName,
        tree: [
            {
                path: "terms.json",
                mode: "100644",
                type: "blob",
                sha: newBlob.data.sha
            }
        ],
        base_tree: currentCommit.data.tree.sha
    });

    // create new commit with current commit SHA as parent and new tree SHA => commit SHA
    const newCommit = await octokit.git.createCommit({
        owner: repoOwner,
        repo: repoName,
        message: `New Government Acronym suggestion from ${
            submission.contributor
        } <${submission.contributor_email}>`,
        tree: newTree.data.sha,
        parents: [currentCommit.data.sha]
    });

    // update ref to point to commit SHA
    const updateRefResults = await octokit.git.updateRef({
        owner: repoOwner,
        repo: repoName,
        ref: newRefName,
        sha: newCommit.data.sha
    });

    // Create new PR to dev
    const prResults = await octokit.pulls.create({
        owner: repoOwner,
        repo: repoName,
        title: `New Government Acronym suggestion from ${
            submission.contributor
        } <${submission.contributor_email}>`,
        head: newBranchName,
        base: githubRef,
        body: "```\n" + JSON.stringify(newTerm, null, 4) + "\n```",
        maintainer_can_modify: true
    });

    res.json({
        pr: prResults.data.html_url
    });
});

router.put("/terms", async (req, res) => {
    let submission = req.body;
    let missingParams = lib.getMissingParams(
        [
            "id",
            "contributor",
            "contributor_email",
            "term",
            "full_term",
            "description"
        ],
        submission
    );
    if (missingParams.length > 0) {
        res.status(400).json({
            error: `The following parameters are missing: ${missingParams.join(
                ", "
            )}`
        });
        return;
    }

    const updatedTerm = {
        term: submission.term,
        full_term: submission.full_term,
        description: submission.description,
        link: submission.link || "",
        categories:
            submission.categories.length > 0 ? submission.categories : []
    };

    let response = await octokit.repos.getContents({
        owner: repoOwner,
        repo: repoName,
        path: "terms.json",
        ref: githubRef
    });

    let termsFileRaw = Buffer.from(response.data.content, "base64").toString();
    let termsJson = termsFileRaw
        .split("\n")
        .slice(2)
        .join("\n");
    let existingTerms = JSON.parse(termsJson);

    existingTerms.splice(submission.id, 1, updatedTerm);

    let newContent = "---\n" + "---\n" + JSON.stringify(existingTerms, null, 4);

    const baseRef = await octokit.git.getRef({
        owner: repoOwner,
        repo: repoName,
        ref: `heads/${githubRef}`
    });

    const newBranchId = await lib.generateId();
    const newBranchName = `term-edits-${new Date()
        .toISOString()
        .substring(0, 10)}-${newBranchId}-edit`;

    const newRefName = `heads/${newBranchName}`;

    const newRef = await octokit.git.createRef({
        owner: repoOwner,
        repo: repoName,
        ref: "refs/" + newRefName,
        sha: baseRef.data.object.sha
    });

    // post new blob object with new content => blob SHA
    const newBlob = await octokit.git.createBlob({
        owner: repoOwner,
        repo: repoName,
        content: newContent
    });

    // get current commit => commit object {tree: {url, sha}}
    const currentCommit = await octokit.git.getCommit({
        owner: repoOwner,
        repo: repoName,
        commit_sha: baseRef.data.object.sha
    });

    // post new tree object with file path pointer replaced with new blob SHA => tree SHA
    const newTree = await octokit.git.createTree({
        owner: repoOwner,
        repo: repoName,
        tree: [
            {
                path: "terms.json",
                mode: "100644",
                type: "blob",
                sha: newBlob.data.sha
            }
        ],
        base_tree: currentCommit.data.tree.sha
    });

    // create new commit with current commit SHA as parent and new tree SHA => commit SHA
    const newCommit = await octokit.git.createCommit({
        owner: repoOwner,
        repo: repoName,
        message: `New Government acronym edit from ${submission.contributor} <${
            submission.contributor_email
        }>`,
        tree: newTree.data.sha,
        parents: [currentCommit.data.sha]
    });

    // update ref to point to commit SHA
    const updateRefResults = await octokit.git.updateRef({
        owner: repoOwner,
        repo: repoName,
        ref: newRefName,
        sha: newCommit.data.sha
    });

    // Create new PR to dev
    const prResults = await octokit.pulls.create({
        owner: repoOwner,
        repo: repoName,
        title: `New Government acronym edit from ${submission.contributor} <${
            submission.contributor_email
        }>`,
        head: newBranchName,
        base: githubRef,
        body: "```\n" + JSON.stringify(updatedTerm, null, 4) + "\n```",
        maintainer_can_modify: true
    });

    res.json({
        pr: prResults.data.html_url
    });
});
module.exports = router;
