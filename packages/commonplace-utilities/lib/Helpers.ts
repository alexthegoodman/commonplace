import { nanoid } from "nanoid";
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

  emailToUsername(email) {
    const emailUsername = email.split("@")[0];
    const pin = nanoid(10);
    const generatedUsername = emailUsername + "-" + pin;

    return generatedUsername;
  }

  // getImageUrl(sourceUrl, size = { width: 800 }) {
  //   const imageRequest = JSON.stringify({
  //     bucket: "cp-aws-assets",
  //     key: sourceUrl,
  //     edits: {
  //       resize: {
  //         // width: 800,
  //         // height: 800,
  //         fit: "contain",
  //         ...size,
  //       },
  //     },
  //   });

  //   const requestData = Buffer.from(imageRequest).toString("base64");

  //   const imageUrl = `${cloudfrontUrl}/${requestData}`;

  //   return imageUrl;
  // }

  // preloadImage(url) {
  //   var img = new Image();
  //   img.src = url;
  // }
}
