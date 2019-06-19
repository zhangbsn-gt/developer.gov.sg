const axios = require("axios");
const config = require("../app/config");
const utils = require("./utils");

module.exports = {
    requestOtp,
    verifyOtp
};

async function requestOtp(email) {
    let endpoint = new URL("/otp/get", config.otpServiceUrl);
    return await axios.post(endpoint.href, {
        email
    });
}
async function verifyOtp(email, otp) {
    if (!utils.emailRegex.test(email)) {
        throw new Error("Only valid gov.sg emails are accepted.");
    }
    let endpoint = new URL("/otp/validate", config.otpServiceUrl);
    return await axios.post(endpoint.href, {
        email,
        otp
    });
}
