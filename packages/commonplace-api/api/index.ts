import { server } from "./server";

export const startApolloServer = () => {
  server.listen().then(({ url }) => {
    console.info(`🚀 Apollo Server ready at ${url}`);
  });
};
