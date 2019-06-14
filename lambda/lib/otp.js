const axios = require("axios");
const config = require("config");

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
    let endpoint = new URL("/otp/validate", config.otpServiceUrl);
    return await axios.post(endpoint.href, {
        email,
        otp
    });
}
