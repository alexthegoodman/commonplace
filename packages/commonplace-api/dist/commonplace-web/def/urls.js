"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudfrontUrl = exports.cpGraphqlUrl = exports.cpDomain = exports.env = void 0;
exports.env = process.env.NEXT_PUBLIC_APP_ENV;
exports.cpDomain = exports.env === "production"
    ? "commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com"
    : "localhost";
exports.cpGraphqlUrl = exports.env === "production"
    ? "http://commonplaceapi-env.eba-u9h46njg.us-east-2.elasticbeanstalk.com:4000/graphql"
    : "http://localhost:4000/graphql";
exports.cloudfrontUrl = "https://d3ubks77jdbtp7.cloudfront.net/";
//# sourceMappingURL=urls.js.map