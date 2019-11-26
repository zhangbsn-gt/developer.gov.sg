export default {
  nodeEnv: process.env.NODE_ENV,
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://api.developer.gov.sg/v1/api"
      : "http://localhost:4321/api"
};
