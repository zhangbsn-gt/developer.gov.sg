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

    delete formData.ip; // Injected by Netlify. Don't pick it up.
    terms.push({
        ...formData
    })

    console.log(JSON.stringify(terms, null, 2));

    callback(null, {
        statusCode: 200,
        body: "success!"
    });
};
