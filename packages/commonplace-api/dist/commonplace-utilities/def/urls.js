"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Url = exports.cloudfrontUrl = exports.cpGraphqlUrl = exports.cpDomain = exports.env = void 0;
exports.env = process.env.NEXT_PUBLIC_APP_ENV;
exports.cpDomain = exports.env === "production" ? "commonplace.social" : "localhost";
exports.cpGraphqlUrl = exports.env === "production"
    ? "https://commonplace.social:4000/graphql"
    : "http://localhost:4000/graphql";
exports.cloudfrontUrl = "https://d3ubks77jdbtp7.cloudfront.net/";
exports.s3Url = "https://cp-aws-assets.s3.us-east-2.amazonaws.com/";
//# sourceMappingURL=urls.js.map