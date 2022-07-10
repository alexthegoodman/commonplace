import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { Context, context } from "./context";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    // TODO: verify jwt?
    const tokenHeaderKey = process.env.TOKEN_HEADER_KEY as string;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    let currentUser;

    try {
      const token = req.header(tokenHeaderKey);

      const verified = jwt.verify(token, jwtSecretKey);

      if (verified) {
        currentUser = await prisma.user.findFirst({
          where: {
            id: verified.userId,
          },
        });

        console.info("verified currentUser", verified, currentUser);
      } else {
        // return res.status(401).send("Token Could Not Be Verified");
      }
    } catch (error) {
      // return res.status(401).send(error);
    }

    return { req, currentUser, ...context } as Context;
  },
  // TODO: set csrfPrevention as true
  //   csrfPrevention: true,
});
