const Octokit = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});
const yaml = require("js-yaml");

exports.handler = async function(event, context, callback) {
    let eventBody = JSON.parse(event.body)

    let formData = eventBody.payload.data;

    console.log(JSON.stringify(formData));

    let response = await octokit.repos.getContents({
        owner: process.env.GITHUB_OWNER,
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
        category: formData.category
    })

    let updatedTermsYaml = yaml.safeDump(terms);

    console.loge(updatedTermsYaml);

    // Create a new ref (branch)
    // octokit.git.createRef({owner, repo, ref, sha})
    // octokit.repos.updateFile({owner, repo, path, message, content, sha})
    
    callback(null, {
        statusCode: 200,
        body: "success!"
    });
};
