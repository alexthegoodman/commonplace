import express from "express";
import { server } from "./server";

import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

export const startApolloServer = async () => {
  await server.start();

  const app = express();

  app.use(
    graphqlUploadExpress({
      maxFieldSize: 15000000,
      maxFileSize: 15000000, // 15 MB
      maxFiles: 20,
    })
  );

  const corsOptions = {
    origin: [
      "https://commonplace-six.vercel.app",
      "https://commonplace.social",
      "http://localhost:9000",
      "http://localhost:3000",
    ],
  };

  server.applyMiddleware({ app, cors: corsOptions, path: "/graphql" });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};
