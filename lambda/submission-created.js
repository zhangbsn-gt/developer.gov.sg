const yaml = require("js-yaml");
const crypto = require("crypto");
const beautifyHtml = require("js-beautify").html;
const Octokit = require("@octokit/rest");

const githubToken = process.env.GITHUB_TOKEN;
const repoOwner = process.env.GITHUB_OWNER;
const githubRef = process.env.GITHUB_REF;

if (!githubToken ||
    !repoOwner ||
    !githubRef) {
    throw new Error("One or more environment variables were not defined!");
}

const octokit = new Octokit({
    auth: githubToken
});

exports.handler = async function(event, context, callback) {
    let eventBody = JSON.parse(event.body);
    let formData = eventBody.payload.data;
    let repoName = "developer.gov.sg";

    if (formData.hasOwnProperty("form_name") && formData.form_name === "edit-form") {
        let path = formData.page_path;
        let title = formData.page_title;
        let category = formData.page_category;
        let content = formData.page_content;

        let newPage =
            `---\n` +
            `title: ${title}\n` +
            `layout: layout-sidenav\n` +
            `permalink: ${path}\n` +
            `category: ${category}\n` +
            `breadcrumb: ${title.toUpperCase()}\n` +
            `---\n`;

        const formattedContent = beautifyHtml(content, {
            wrap_line_length: 120
        });
        newPage += formattedContent;

        const baseRef = await octokit.git.getRef({
            owner: repoOwner,
            repo: repoName,
            ref: `heads/${githubRef}`
        });

        const newBranchId = await generateId();
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
            message: `New edits for ${formData.page_title} page`,
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
            title: `New edits for ${formData.page_title} page`,
            head: newBranchName,
            base: githubRef,
            body: newPage,
            maintainer_can_modify: true
        });

        callback(null, {
            statusCode: 200,
            body: prResults.data.html_url
        });
    } else {
        let response = await octokit.repos.getContents({
            owner: repoOwner,
            repo: repoName,
            path: "_data/terms.yml",
            ref: githubRef
        });

        let termsFileRaw = Buffer.from(response.data.content, "base64").toString();

        let newTerm = [{
            term: formData.term,
            full_term: formData.full_term,
            description: formData.description,
            link: formData.link,
            category: [formData.category]
        }];
        let newTermYaml = yaml.safeDump(newTerm);
        let updatedTermsYaml = "";
        if (termsFileRaw[termsFileRaw.length - 1] === "\n") {
            updatedTermsYaml = termsFileRaw + newTermYaml;
        } else {
            updatedTermsYaml = termsFileRaw + "\n" + newTermYaml;
        }

        const baseRef = await octokit.git.getRef({
            owner: repoOwner,
            repo: repoName,
            ref: `heads/${githubRef}`
        });

        const newBranchId = await generateId();
        const newBranchName = `terms-${new Date().toISOString().substring(0, 10)}-${newBranchId}`;
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
            content: updatedTermsYaml
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
            tree: [{
                path: "_data/terms.yml",
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
            message: `New term suggested by ${formData.contributor} <${formData.contributor_email}>`,
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
            title: `New Government Acronym Suggestion`,
            head: newBranchName,
            base: githubRef,
            body: newTermYaml,
            maintainer_can_modify: true
        });

        callback(null, {
            statusCode: 200,
            body: prResults.data.html_url
        });
    }
};

async function generateId() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(4, function(err, buffer) {
            if (err) {
                reject(err);
            }
            resolve(buffer.toString("hex"));
        });
    });
}