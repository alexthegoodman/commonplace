import jwt from "jsonwebtoken";

const client = require("mailchimp-marketing");

client.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: "us13",
});

export default class Helpers {
  constructor() {}

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

  async subscribeMailchimp(email) {
    try {
      // use this to get the correct id for the audience / list
      // const response1 = await client.lists.getAllLists();
      // console.log(response1);
      const response = await client.lists.addListMember("b9c7f37268", {
        email_address: email,
        status: "subscribed",
      });
      // console.info(response);

      return response;
    } catch (error) {
      console.error("ERROR subscribeMailchimp", error);
    }
  }
}
