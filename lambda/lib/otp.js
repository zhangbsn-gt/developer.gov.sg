const axios = require("axios");
const crypto = require("crypto");
const config = require("../app/config");
const utils = require("./utils");

module.exports = {
  requestOtp,
  verifyOtp
};

async function requestOtp(email) {
  let endpoint = new URL(`${config.otpServiceUrl}/otp`);
  let authToken = generateOtpApiSignature();

  return await axios.post(
    endpoint.href,
    {
      email
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
}

async function verifyOtp(email, otp, otpRequestId) {
  if (!utils.emailRegex.test(email)) {
    throw new Error("Only valid gov.sg emails are accepted.");
  }
  let endpoint = new URL(`${config.otpServiceUrl}/otp/${otpRequestId}`);
  let authToken = generateOtpApiSignature();

  return await axios.put(
    endpoint.href,
    {
      pin: otp
    },
    {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }
  );
}

function generateOtpApiSignature() {
  let hmac = crypto
    .createHmac("sha256", config.otpServiceAppSecret)
    .update(config.otpServiceAppId)
    .digest("hex");

  let authTokenRaw = `${config.otpServiceAppId}:${hmac}`;
  return Buffer.from(authTokenRaw).toString("base64");
}
