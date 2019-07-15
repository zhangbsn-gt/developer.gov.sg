const Octokit = require("@octokit/rest");
const { App } = require("@octokit/app");
const utils = require("./utils");

const {
    githubAppId,
    githubAppKey,
    githubAppInstallationId,
    githubBaseRef,
    githubRepoOwner,
    githubRepoName
} = require("../app/config");

const app = new App({ id: githubAppId, privateKey: githubAppKey });

const octokit = new Octokit({
    async auth() {
        const installationAccessToken = await app.getInstallationAccessToken(
            {
                installationId: githubAppInstallationId
            }
        );
        return `token ${installationAccessToken}`;
    }
});

module.exports = {
    octokit,
    createNewBranchAndPullRequest,
    addLabelsToPullRequest,
    checkForConflictingPr
};

/**
 * @param {string} options.filePath
 * @param {string} options.fileContent
 * @param {string} options.baseBranchName
 * @param {string} options.newBranchName
 * @param {string} options.commitMessage
 * @param {string} options.prTitle
 * @param {string} options.prBody
 */
async function createNewBranchAndPullRequest({
    filePath,
    fileContent,
    baseBranchName,
    newBranchName,
    commitMessage,
    prTitle,
    prBody
}) {
    const baseRef = await octokit.git.getRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: `heads/${baseBranchName}`
    });

    const newRefName = `heads/${newBranchName}`;

    await octokit.git.createRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: "refs/" + newRefName,
        sha: baseRef.data.object.sha
    });

    const newBlob = await octokit.git.createBlob({
        owner: githubRepoOwner,
        repo: githubRepoName,
        content: fileContent
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
                path: filePath,
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
        message: commitMessage,
        tree: newTree.data.sha,
        parents: [currentCommit.data.sha]
    });

    // update ref to point to commit SHA
    await octokit.git.updateRef({
        owner: githubRepoOwner,
        repo: githubRepoName,
        ref: newRefName,
        sha: newCommit.data.sha
    });

    const prResults = await octokit.pulls.create({
        owner: githubRepoOwner,
        repo: githubRepoName,
        title: prTitle,
        head: newBranchName,
        base: githubBaseRef,
        body: prBody,
        maintainer_can_modify: true
    });

    return prResults;
}

async function addLabelsToPullRequest({ labels, prNumber, assignees }) {
    return octokit.issues.update({
        owner: githubRepoOwner,
        repo: githubRepoName,
        issue_number: prNumber,
        labels,
        assignees
    });
}
/**
 *
 * @param {*} labelsToCheck
 * @returns {(Object|boolean)} Returns conflicting PR object, or false if there aren't any
 */
async function checkForConflictingPr(labelsToCheck) {
    const pullRequests = await octokit.pulls.list({
        owner: githubRepoOwner,
        repo: githubRepoName,
        state: "open",
        base: githubBaseRef
    });
    if (pullRequests.data.length > 0) {
        // Find conflicting PRs
        for (const pr of pullRequests.data) {
            if (
                utils.firstArrayContainsSecondArray(
                    pr.labels.map(label => label.name),
                    labelsToCheck
                )
            ) {
                return pr;
            }
        }
    }
    return false;
}
