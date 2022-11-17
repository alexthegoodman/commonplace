import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const UpdateUserLanguageMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateUserLanguage", {
      type: "String",
      args: {
        language: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { language },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            language,
          },
        });

        mixpanel.track("User Language Updated", { updatedUser });

        return updatedUser?.id;
      },
    });
  },
});
