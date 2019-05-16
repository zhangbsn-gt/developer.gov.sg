const Octokit = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});
const yaml = require("js-yaml");
const crypto = require("crypto");

exports.handler = async function(event, context, callback) {
    let eventBody = JSON.parse(event.body);

    let formData = eventBody.payload.data;

    let repoOwner = process.env.GITHUB_OWNER;

    let response = await octokit.repos.getContents({
        owner: repoOwner,
        repo: "developer.gov.sg",
        path: "_data/terms.yml"
    });

    let termsFileYaml = Buffer.from(response.data.content, "base64").toString();

    let terms = yaml.safeLoad(termsFileYaml);

    terms.push({
        term: formData.term,
        full_term: formData.full_term,
        description: formData.description,
        link: formData.link,
        category: [formData.category]
    });

    let updatedTermsYaml = yaml.safeDump(terms);

    const devRef = await octokit.git.getRef({
        owner: repoOwner,
        repo: "developer.gov.sg",
        ref: "heads/dev"
    });

    const newBranchId = await generateId();
    const newRefName = "heads/terms-" + new Date().toISOString().substring(0, 11) + newBranchId;
    const newRef = await octokit.git.createRef({
        owner: repoOwner,
        repo: "developer.gov.sg",
        ref: "refs/" + newRefName,
        sha: devRef.data.object.sha
    });

    console.log("created ref: " + JSON.stringify(newRef.data));

    // post new blob object with new content => blob SHA
    const newBlob = await octokit.git.createBlob({
        owner: repoOwner,
        repo: "developer.gov.sg",
        content: updatedTermsYaml
    });

    console.log("created blob: " + JSON.stringify(newBlob.data));

    // get current commit => commit object {tree: {url, sha}}
    const currentCommit = await octokit.git.getCommit({
        owner: repoOwner,
        repo: "developer.gov.sg",
        commit_sha: devRef.data.object.sha
    });

    console.log("current commit: " + JSON.stringify(currentCommit.data));

    // post new tree object with file path pointer replaced with new blob SHA => tree SHA
    const newTree = await octokit.git.createTree({
        owner: repoOwner,
        repo: "developer.gov.sg",
        tree: [
            {
                path: "_data/terms.yml",
                mode: "100644",
                type: "blob",
                sha: newBlob.data.sha
            }
        ],
        base_tree: currentCommit.data.tree.sha
    });

    console.log("created tree: " + JSON.stringify(newTree.data));

    // create new commit with current commit SHA as parent and new tree SHA => commit SHA
    const newCommit = await octokit.git.createCommit({
        owner: repoOwner,
        repo: "developer.gov.sg",
        message:
            "new term suggested by " +
            `${formData.contributor} <${formData.contributor_email}>`,
        tree: newTree.data.sha,
        parents: [currentCommit.data.sha]
    });

    console.log("created commit: " + JSON.stringify(newCommit.data));

    // update ref to point to commit SHA
    const updateRefResults = await octokit.git.updateRef({
        owner: repoOwner,
        repo: "developer.gov.sg",
        ref: newRefName,
        sha: newCommit.data.sha
    });

    console.log(
        "updated ref to new commit: " + JSON.stringify(updateRefResults.data)
    );

    callback(null, {
        statusCode: 200,
        body: "success!"
    });
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
