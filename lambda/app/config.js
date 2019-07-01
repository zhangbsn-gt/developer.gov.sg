const githubToken = loadEnvVar("GITHUB_TOKEN");

const githubRepoOwner = loadEnvVar("GITHUB_OWNER");

const githubBaseRef = loadEnvVar("GITHUB_BASE_REF"); // https://www.netlify.com/docs/continuous-deployment/#environment-variables

const otpServiceUrl = loadEnvVar("OTP_SERVICE_URL");

const githubSvcUser = Number.parseInt(loadEnvVar("GITHUB_SVC_USER"));

function loadEnvVar(envVarName) {
    if (process.env[envVarName]) {
        return process.env[envVarName];
    } else {
        throw new Error(`Missing environment variable: ${envVarName}`);
    }
}

module.exports = {
    githubToken,
    githubBaseRef,
    githubSvcUser,
    githubRepoOwner,
    githubRepoName: "developer.gov.sg",
    otpServiceUrl,
    clientID: loadEnvVar("GITHUB_SSO_ID"),
    clientSecret: loadEnvVar("GITHUB_SSO_SECRET"),
};
