const {
    URL
} = require("url");
const express = require("express");
const beautifyHtml = require("js-beautify").html;
const Octokit = require("@octokit/rest");
const axios = require("axios");
const packageInfo = require("../package.json");
const {
    githubToken,
    repoOwner,
    githubRef,
    otpServiceUrl
} = require("./config");
const lib = require("./lib");

const octokit = new Octokit({
    auth: githubToken
});
const router = express.Router();

router.get("/", (req, res) => res.json({
    version: packageInfo.version
}));

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
    const repoName = "developer.gov.sg";
    let postBody = req.body;

    let missingParams = lib.getMissingParams([
        "contributor",
        "otp",
        "page_path",
        "page_title",
        "page_category",
        "page_content",
        "page_layout"
    ], postBody);
    if (missingParams.length > 0) {
        res.status(400).json({
            error: `The following parameters are missing: ${missingParams.join(", ")}`
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
        const newBranchName = `edits-${new Date().toISOString().substring(0, 10)}-${newBranchId}`;
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
            tree: [{
                path: "contents" + path + "index.html",
                mode: "100644",
                type: "blob",
                sha: newBlob.data.sha
            }],
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
module.exports = router;