function loadEnvVar(envVarName) {
    if (process.env[envVarName]) {
        return process.env[envVarName];
    } else {
        throw new Error(`Missing environment variable: ${envVarName}`);
    }
}

module.exports = {
    githubBaseRef: loadEnvVar("GITHUB_BASE_REF"),
    githubAppId: Number.parseInt(loadEnvVar("GITHUB_APP_ID")),
    githubAppKey: loadEnvVar("GITHUB_APP_KEY").split("\\n").join("\n"), // To format newlines properly
    githubAppInstallationId: Number.parseInt(loadEnvVar("GITHUB_APP_INSTALLATION_ID")),
    githubRepoOwner: loadEnvVar("GITHUB_OWNER"),
    githubRepoName: "developer.gov.sg",
    otpServiceUrl: loadEnvVar("OTP_SERVICE_URL"),
    clientID: loadEnvVar("GITHUB_SSO_ID"),
    clientSecret: loadEnvVar("GITHUB_SSO_SECRET"),
    tokenHash: loadEnvVar("GITHUB_SSO_TOKEN_HASH")
};
