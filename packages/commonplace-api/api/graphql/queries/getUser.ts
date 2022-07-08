import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, { prisma }: Context) => {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        console.info("Get user", id, user);

        return user;
      },
    });
  },
});
