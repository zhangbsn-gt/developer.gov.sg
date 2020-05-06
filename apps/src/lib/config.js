export default {
  nodeEnv: process.env.NODE_ENV,
  apiUrl:
    process.env.BRANCH === "master"
      ? "https://api.developer.gov.sg/v1/api"
      : process.env.API_URL,
};
