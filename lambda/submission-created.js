const Octokit = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});
const yaml = require("js-yaml");
const crypto = require("crypto");

exports.handler = async function(event, context, callback) {
    let eventBody = JSON.parse(event.body);

    let formData = eventBody.payload.data;

    console.log(JSON.stringify(formData));

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

    console.log(updatedTermsYaml);

    // get ref of latest dev branch
    const devRef = await octokit.git.getRef({
        owner: repoOwner,
        repo: "developer.gov.sg",
        ref: "heads/dev"
    });

    console.log(JSON.stringify(devRef));
    // {
    //     "ref": "refs/heads/featureA",
    //     "node_id": "MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlQQ==",
    //     "url": "https://api.github.com/repos/octocat/Hello-World/git/refs/heads/featureA",
    //     "object": {
    //       "type": "commit",
    //       "sha": "aa218f56b14c9653891f9e74264a383fa43fefbd",
    //       "url": "https://api.github.com/repos/octocat/Hello-World/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd"
    //     }
    //   }

    const newBranchId = await generateId();

    const newRef = await octokit.git.createRef({
        owner: repoOwner,
        repo: "developer.gov.sg",
        ref: "refs/heads/terms-" + newBranchId,
        sha: devRef.object.sha
    });

    // get current commit
    // get current commit's tree
    // post new blob object with new content => blob SHA
    // post new tree object with file path pointer replaced with new blob SHA => tree SHA
    // create new commit with current commit SHA as parent and new tree SHA => commit SHA
    // update ref to point to commit SHA

    callback(null, {
        statusCode: 200,
        body: "success!"
    });
};

async function generateId() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(12, function(err, buffer) {
            if (err) {
                reject(err);
            }
            resolve(buffer.toString("hex"));
        });
    });
}
