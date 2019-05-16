const Octokit = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});
const yaml = require("js-yaml");

exports.handler = async function(event, context, callback) {
    let eventBody = JSON.parse(event.body)
    let form = eventBody.payload;
    let site = eventBody.site;

    console.log(JSON.stringify(form, null, 2));
    console.log(JSON.stringify(site, null, 2));

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
