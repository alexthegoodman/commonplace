import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicUserFields } from "../types/User";

export const UserByUsernameQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getUserByUsername", {
      type: "PublicUser",
      args: {
        chosenUsername: nonNull(stringArg()),
      },
      resolve: async (_, { chosenUsername }, { prisma }: Context) => {
        const user = await prisma.user.findFirst({
          where: {
            chosenUsername,
          },
          select: publicUserFields,
        });

        console.info("getUserByUsername", chosenUsername, user);

        return user;
      },
    });
  },
});
