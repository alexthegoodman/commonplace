import { nanoid } from "nanoid";
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
    if (str && typeof str !== "undefined") {
      return str
        .split(";")
        .map((v) => v.split("="))
        .reduce((acc, v) => {
          acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
            v[1].trim()
          );
          return acc;
        }, {});
    } else {
      return {};
    }
  }

  parseAuthHeader(str) {
    console.info("parseAuthHeader", str);
    const credentials = Buffer.from(str.split("Basic ")[1], "base64").toString(
      "ascii"
    );
    return credentials.split(":");
  }

  createAuthHeader(str) {
    const authPayload = Buffer.from(`${str}`, "utf8").toString("base64");
    return `Basic ${authPayload}`;
  }

  emailToUsername(email) {
    const emailUsername = email.split("@")[0];
    const pin = nanoid(10);
    const generatedUsername = emailUsername + "-" + pin;

    return generatedUsername;
  }
}
