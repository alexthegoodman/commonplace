import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const DeleteUserAdminMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteUserAdmin", {
      type: "String",
      args: {
        generatedUsername: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { generatedUsername },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        console.info("Delete User", generatedUsername);

        const messages = await prisma.message.deleteMany({
          where: {
            user: {
              generatedUsername,
            },
          },
        });

        const posts = await prisma.post.deleteMany({
          where: {
            creator: {
              generatedUsername,
            },
          },
        });

        const user = await prisma.user.delete({
          where: {
            generatedUsername,
          },
        });

        mixpanel.track("User Deleted by Admin", { user });

        console.info("Deleted user", user);

        return "deleted";
      },
    });
  },
});
