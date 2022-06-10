import express from "express";
import { server } from "./server";

import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

export const startApolloServer = async () => {
  // server
  //   .listen({
  //     host: "0.0.0.0",
  //     port: 4000,
  //   })
  //   .then(({ url }) => {
  //     console.info(`🚀 Apollo Server ready at ${url}`);
  //   });
  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(
    graphqlUploadExpress({
      maxFieldSize: 10000000,
      maxFileSize: 10000000, // 10 MB
      maxFiles: 20,
    })
  );

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};
