import jwt from "jsonwebtoken";

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
}
