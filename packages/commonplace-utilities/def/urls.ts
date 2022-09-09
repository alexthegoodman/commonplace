export const env = process.env.NEXT_PUBLIC_APP_ENV;

export const cpDomain =
  env === "production"
    ? "commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com"
    : "localhost";

export const cpGraphqlUrl =
  env === "production"
    ? "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql"
    : "http://localhost:4000/graphql";

export const cloudfrontUrl = "https://d3ubks77jdbtp7.cloudfront.net/";

export const s3Url = "https://cp-aws-assets.s3.us-east-2.amazonaws.com/";
