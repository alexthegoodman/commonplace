export const env = process.env.NODE_ENV;

export const cpDomain =
  env === "production"
    ? "commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com"
    : "localhost";

export const cpGraphqlUrl =
  env === "production"
    ? "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql"
    : "http://localhost:4000/graphql";
