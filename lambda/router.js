const express = require("express");
const beautifyHtml = require("js-beautify").html;
const Octokit = require("@octokit/rest");
const slugify = require("slugify");
const packageInfo = require("../package.json");
const {
    githubToken,
    githubBaseRef,
    githubSvcUser,
    githubRepoOwner,
    otpServiceUrl,
    githubRepoName
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
    const requestBody = req.body;
    if (!requestBody.email) {
        res.status(400).json({
            error: "The email parameter is missing."
        });
        return;
    }

    try {
        let otpResponse = await lib.otp.requestOtp(
            requestBody.email
        );
        res.json(otpResponse.data);
    } catch (err) {
        res.status(500).json({
            error: err.message || "Error requesting for email verification OTP."
        });
    }
});

router.post("/submit-product-changes", async (req, res) => {
    let requestBody = req.body;

    let missingParams = lib.getMissingParams(
        [
            "email",
            "otp",
            "page_path",
            "page_title",
            "page_category",
            "page_content",
            "page_layout"
        ],
        requestBody
    );
    if (missingParams.length > 0) {
        res.status(400).json({
            error: `The following parameters are missing: ${missingParams.join(
                ", "
            )}`
        });
        return;
    }

    let email = requestBody.email;
    let otp = requestBody.otp;

    try {
        await lib.otp.verifyOtp(email, otp);
    } catch (err) {
        res.status(403).json({
            error: "OTP validation failed."
        });
        return;
    }

    let path = requestBody.page_path;
    let title = requestBody.page_title;
    let category = requestBody.page_category;
    let content = requestBody.page_content;
    let layout = requestBody.page_layout;

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
            owner: githubRepoOwner,
            repo: githubRepoName,
            ref: `heads/${githubBaseRef}`
        });

        const newBranchId = await lib.generateId();
        const newBranchName = `product-edit-${new Date()
            .toISOString()
            .substring(0, 10)}-${newBranchId}`;
        const newRefName = `heads/${newBranchName}`;

        const newRef = await octokit.git.createRef({
            owner: githubRepoOwner,
            repo: githubRepoName,
            ref: "refs/" + newRefName,
            sha: baseRef.data.object.sha
        });

        const newBlob = await octokit.git.createBlob({
            owner: githubRepoOwner,
            repo: githubRepoName,
            content: newPage
        });

        const currentCommit = await octokit.git.getCommit({
            owner: githubRepoOwner,
            repo: githubRepoName,
            commit_sha: baseRef.data.object.sha
        });

        // post new tree object with file path pointer replaced with new blob SHA => tree SHA
        const newTree = await octokit.git.createTree({
            owner: githubRepoOwner,
            repo: githubRepoName,
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
            owner: githubRepoOwner,
            repo: githubRepoName,
            message: `New edits for ${title} page by ${email}`,
            tree: newTree.data.sha,
            parents: [currentCommit.data.sha]
        });

        // update ref to point to commit SHA
        const updateRefResults = await octokit.git.updateRef({
            owner: githubRepoOwner,
            repo: githubRepoName,
            ref: newRefName,
            sha: newCommit.data.sha
        });

        const prResults = await octokit.pulls.create({
            owner: githubRepoOwner,
            repo: githubRepoName,
            title: `New edits for ${title} page by ${email}`,
            head: newBranchName,
            base: githubBaseRef,
            body: newPage,
            maintainer_can_modify: true
        });

        const issueUpdateResults = await octokit.issues.update({
            owner: githubRepoOwner,
            repo: githubRepoName,
            issue_number: prResults.data.number,
            labels: [
                "product",
                slugify(title, {
                    lower: true,
                    remove: /[*+~.()'"!:@]/g
                })
            ]
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
            "email",
            "otp",
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

    const email = submission.email;
    const otp = submission.otp;

    try {
        await lib.otp.verifyOtp(email, otp);
    } catch (err) {
        res.status(403).json({
            error: "OTP validation failed."
        });
        return;
    }

    let response = await octokit.repos.getContents({
        owner: githubRepoOwner,
        repo: githubRepoName,
        path: "terms.json",
        ref: githubBaseRef
    });

    let termsFileRaw = Buffer.from(response.data.content, "base64").toString();

    let existingTerms = JSON.parse(termsFileRaw);

    let newTerm = {
        term: submission.term,
        full_term: submission.full_term,
        description: submission.description,
        links: submission.links.length > 0 ? submission.links : [],
        categories:
            submission.categories.length > 0 ? submission.categories : []
    };

    existingTerms.push(newTerm);
    lib.sortTerms(existingTerms);

    let newContent = JSON.stringify(existingTerms, null, 4);

    const baseRef = await octokit.git.getRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: `heads/${githubBaseRef}`
    });

    const newBranchId = await lib.generateId();
    const newBranchName = `term-new-${new Date()
        .toISOString()
        .substring(0, 10)}-${newBranchId}`;
    const newRefName = `heads/${newBranchName}`;
    const newRef = await octokit.git.createRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: "refs/" + newRefName,
        sha: baseRef.data.object.sha
    });

    // post new blob object with new content => blob SHA
    const newBlob = await octokit.git.createBlob({
        owner: githubRepoOwner,
        repo: githubRepoName,
        content: newContent
    });

    // get current commit => commit object {tree: {url, sha}}
    const currentCommit = await octokit.git.getCommit({
        owner: githubRepoOwner,
        repo: githubRepoName,
        commit_sha: baseRef.data.object.sha
    });

    // post new tree object with file path pointer replaced with new blob SHA => tree SHA
    const newTree = await octokit.git.createTree({
        owner: githubRepoOwner,
        repo: githubRepoName,
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
        owner: githubRepoOwner,
        repo: githubRepoName,
        message: `New acronym suggestion from ${submission.contributor} <${
            submission.contributor_email
        }>`,
        tree: newTree.data.sha,
        parents: [currentCommit.data.sha]
    });

    // update ref to point to commit SHA
    const updateRefResults = await octokit.git.updateRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: newRefName,
        sha: newCommit.data.sha
    });

    // Create new PR to dev
    const prResults = await octokit.pulls.create({
        owner: githubRepoOwner,
        repo: githubRepoName,
        title: `New acronym suggestion from ${submission.contributor} <${
            submission.contributor_email
        }>`,
        head: newBranchName,
        base: githubBaseRef,
        body: "```\n" + JSON.stringify(newTerm, null, 4) + "\n```",
        maintainer_can_modify: true
    });

    const issueUpdateResults = await octokit.issues.update({
        owner: githubRepoOwner,
        repo: githubRepoName,
        issue_number: prResults.data.number,
        labels: [
            "term",
            slugify(submission.term, {
                lower: true,
                remove: /[*+~.()'"!:@]/g
            })
        ]
    });

    res.json({
        pr: prResults.data.html_url
    });
});

router.put("/terms", async (req, res) => {
    let submission = req.body;
    let missingParams = lib.getMissingParams(
        [
            "email",
            "otp",
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

    const email = submission.email;
    const otp = submission.otp;

    try {
        await lib.otp.verifyOtp(email, otp);
    } catch (err) {
        res.status(403).json({
            error: "OTP validation failed."
        });
        return;
    }

    const updatedTerm = {
        term: submission.term,
        full_term: submission.full_term,
        description: submission.description,
        links: submission.links.length > 0 ? submission.links : [],
        categories:
            submission.categories.length > 0 ? submission.categories : []
    };

    let response = await octokit.repos.getContents({
        owner: githubRepoOwner,
        repo: githubRepoName,
        path: "terms.json",
        ref: githubBaseRef
    });

    let termsFileRaw = Buffer.from(response.data.content, "base64").toString();

    let existingTerms = JSON.parse(termsFileRaw);

    let replacedTerm = existingTerms.splice(submission.id, 1, updatedTerm);

    let newContent = JSON.stringify(existingTerms, null, 4);

    const baseRef = await octokit.git.getRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: `heads/${githubBaseRef}`
    });

    const newBranchId = await lib.generateId();
    const newBranchName = `term-edit-${new Date()
        .toISOString()
        .substring(0, 10)}-${newBranchId}-edit`;

    const newRefName = `heads/${newBranchName}`;

    const newRef = await octokit.git.createRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: "refs/" + newRefName,
        sha: baseRef.data.object.sha
    });

    // post new blob object with new content => blob SHA
    const newBlob = await octokit.git.createBlob({
        owner: githubRepoOwner,
        repo: githubRepoName,
        content: newContent
    });

    // get current commit => commit object {tree: {url, sha}}
    const currentCommit = await octokit.git.getCommit({
        owner: githubRepoOwner,
        repo: githubRepoName,
        commit_sha: baseRef.data.object.sha
    });

    // post new tree object with file path pointer replaced with new blob SHA => tree SHA
    const newTree = await octokit.git.createTree({
        owner: githubRepoOwner,
        repo: githubRepoName,
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
        owner: githubRepoOwner,
        repo: githubRepoName,
        message: `New acronym change from ${submission.contributor} <${
            submission.contributor_email
        }>`,
        tree: newTree.data.sha,
        parents: [currentCommit.data.sha]
    });

    // update ref to point to commit SHA
    const updateRefResults = await octokit.git.updateRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: newRefName,
        sha: newCommit.data.sha
    });

    // Create new PR to dev
    const prResults = await octokit.pulls.create({
        owner: githubRepoOwner,
        repo: githubRepoName,
        title: `New acronym change from ${submission.contributor} <${
            submission.contributor_email
        }>`,
        head: newBranchName,
        base: githubBaseRef,
        body: "```\n" + JSON.stringify(updatedTerm, null, 4) + "\n```",
        maintainer_can_modify: true
    });

    let labels = [
        "term",
        slugify(updatedTerm.term, {
            lower: true,
            remove: /[*+~.()'"!:@]/g
        })
    ];
    if (replacedTerm[0].term !== updatedTerm.term) {
        labels.push(
            slugify(replacedTerm[0].term, {
                lower: true,
                remove: /[*+~.()'"!:@]/g
            })
        );
    }
    const issueUpdateResults = await octokit.issues.update({
        owner: githubRepoOwner,
        repo: githubRepoName,
        issue_number: prResults.data.number,
        labels
    });

    res.json({
        pr: prResults.data.html_url
    });
});
module.exports = router;
