import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getUser", {
      type: "User",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context) => {
        console.info("Get user", currentUser);

        return currentUser;
      },
    });
  },
});
