export const env = process.env.NEXT_PUBLIC_APP_ENV;

export const cpDomain =
  env === "production" ? "commonplace.social" : "localhost";

export const cpGraphqlUrl =
  env === "production"
    ? "https://commonplace.social:4000/graphql"
    : "http://localhost:4000/graphql";

export const cloudfrontUrl = "https://d3ubks77jdbtp7.cloudfront.net/";

export const s3Url = "https://cp-aws-assets.s3.us-east-2.amazonaws.com/";
