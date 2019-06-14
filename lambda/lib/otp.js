const axios = require("axios");

module.exports = {
    requestOtp,
    verifyOtp
};

async function requestOtp(otpServiceUrl, email) {
    let endpoint = new URL("/otp/get", otpServiceUrl);
    return await axios.post(endpoint.href, {
        email
    });
}
async function verifyOtp(otpServiceUrl, email, otp) {
    let endpoint = new URL("/otp/validate", otpServiceUrl);
    return await axios.post(endpoint.href, {
        email,
        otp
    });
}
