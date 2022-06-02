import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default class AWS {
  REGION = "us-east-2";
  s3Client;

  constructor() {
    this.s3Client = new S3Client({ region: this.REGION });
  }

  async uploadAsset() {
    const bucketParams = {
      Bucket: "BUCKET_NAME",
      Key: "OBJECT_NAME",
      Body: "BODY",
    };

    try {
      const data = await this.s3Client.send(new PutObjectCommand(bucketParams));

      console.info("uploadAsset complete", bucketParams, data);

      return data;
    } catch (err) {
      console.log("Error", err);
    }
  }
}
