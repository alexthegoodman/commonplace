import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { Context, context } from "./context";

export const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return { req, ...context } as Context;
  },
  // TODO: set csrfPrevention as true
  //   csrfPrevention: true,
});
