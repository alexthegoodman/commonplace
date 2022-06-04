import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import ERROR_CODES from "./ERROR_CODES";
const { DateTime } = require("luxon");

export default class AWS {
  REGION = "us-east-2";
  s3Client;

  constructor() {
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.s3Client = new S3Client({
        region: this.REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    }
  }

  getUploadDirectory() {
    const year = DateTime.now().toFormat("yyyy");
    const month = DateTime.now().toFormat("MM");
    const folder = `${year}/${month}/`;
    return folder;
  }

  getSizeBase64(length) {
    const size = length * (3 / 4);
    return size;
  }

  async uploadAsset(filename, fileType, fileSize, base64) {
    const sizeLimit = 10000000; // 10MB
    const calculatedFileSize = this.getSizeBase64(base64.length);

    if (calculatedFileSize < sizeLimit && fileSize < sizeLimit) {
      const dotIndex = filename.lastIndexOf(".");
      const fileExtension = filename.substring(dotIndex);
      const fileTitle = filename.substring(0, dotIndex);
      const uniqueFileTitle = fileTitle + "-" + nanoid(10);
      const bucketUploadDirectory = this.getUploadDirectory();

      // TODO: eliminate transparency without file corruption
      const key = bucketUploadDirectory + uniqueFileTitle + fileExtension;

      console.info("uploadAsset", key, fileType);

      const buffer = Buffer.from(
        base64.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      const bucketParams = {
        Bucket: "cp-aws-assets",
        Key: key,
        ContentEncoding: "base64",
        ContentType: fileType,
        Body: buffer,
      };

      try {
        const data = await this.s3Client.send(
          new PutObjectCommand(bucketParams)
        );

        console.info("uploadAsset complete", data, key);

        return key;
      } catch (err) {
        console.error("Error", err);
      }
    } else {
      console.error(ERROR_CODES.B001);
    }
  }
}
