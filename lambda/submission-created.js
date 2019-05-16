const Octokit = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});
const yaml = require("js-yaml");

exports.handler = async function(event, context, callback) {
    let form = event.payload;
    let site = event.site;

    console.log(JSON.stringify(event, null, 2));

    let response = await octokit.repos.getContents({
        owner: process.env.GITHUB_OWNER,
        repo: "developer.gov.sg",
        path: "_data/terms.yml"
    });

    let termsFileYaml = Buffer.from(response.data.content, "base64").toString();

    let terms = yaml.safeLoad(termsFileYaml);

    console.log(JSON.stringify(terms, null, 2));

    callback(null, {
        statusCode: 200,
        body: "success!"
    });
};
