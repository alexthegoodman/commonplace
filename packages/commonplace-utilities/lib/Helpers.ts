import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { cloudfrontUrl } from "../../commonplace-web/def/urls";
export default class Helpers {
  constructor() {}

  isDefinedWithContent(item) {
    if (typeof item !== "undefined" && item && item !== "" && item !== null) {
      if (item.constructor === Array && item.length > 0) {
        return true;
      } else if (item.constructor === Array && item.length === 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  parseCookie(str) {
    return str
      .split(";")
      .map((v) => v.split("="))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});
  }

  parseAuthHeader(str) {
    const credentials = Buffer.from(str.split("Basic ")[1], "base64").toString(
      "ascii"
    );
    return credentials.split(":");
  }

  createAuthHeader(str) {
    const authPayload = Buffer.from(`${str}`, "utf8").toString("base64");
    return `Basic ${authPayload}`;
  }

  createJWT(data) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const jwtData = {
      time: Date(),
      ...data,
    };
    const jwtOptions = {
      expiresIn: "7d",
    };

    const token = jwt.sign(jwtData, jwtSecretKey, jwtOptions);

    return token;
  }

  emailToUsername(email) {
    const emailUsername = email.split("@")[0];
    const pin = nanoid(10);
    const generatedUsername = emailUsername + "-" + pin;

    return generatedUsername;
  }
}
