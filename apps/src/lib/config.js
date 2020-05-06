export default {
  nodeEnv: process.env.NODE_ENV,
  apiUrl:
    process.env.BRANCH === "master"
      ? "https://api.developer.gov.sg/v1/api"
      : process.env.BRANCH === "dev"
      ? "https://y5797uvxy3.execute-api.ap-southeast-1.amazonaws.com/development/api"
      : process.env.API_URL,
};
