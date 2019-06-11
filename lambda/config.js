const githubToken = loadEnvVar("GITHUB_TOKEN");

const repoOwner = loadEnvVar("GITHUB_OWNER");

const githubRef = loadEnvVar("GITHUB_REF");

const otpServiceUrl = loadEnvVar("OTP_SERVICE_URL");

function loadEnvVar(envVarName) {
    if (process.env[envVarName]) {
        return process.env[envVarName];
    } else {
        throw new Error(`Missing environment variable: ${envVarName}`);
    }
}

module.exports = {
    githubToken,
    repoOwner,
    githubRef,
    otpServiceUrl
};
