import { server } from "./server";

export const startApolloServer = () => {
  server
    .listen({
      host: "0.0.0.0",
      port: 4000,
    })
    .then(({ url }) => {
      console.info(`🚀 Apollo Server ready at ${url}`);
    });
};
