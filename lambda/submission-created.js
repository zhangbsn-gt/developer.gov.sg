const Octokit = require("@octokit/rest");
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

exports.handler = async function(event, context, callback) {
    let form = event.payload;
    let site = event.site;

    console.log(JSON.stringify(form, null, 2));
    console.log(JSON.stringify(site, null, 2));

    let response = await octokit.repos.getContents({
        owner: process.env.GITHUB_OWNER,
        repo: "developer.gov.sg",
        path: "_data/terms.yml"
    });

    let termsFile = Buffer.from(contents.data.content, "base64").toString();

    let { name, email, term, category, description, link } = form;

    callback(null, {
        statusCode: 200,
        body: "success!"
    });
};
