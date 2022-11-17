import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const UpdateFavoriteInterestMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateFavoriteInterest", {
      type: "String",
      args: {
        interestId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { interestId },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        const updatedUser = await prisma.user.update({
          where: {
            id: currentUser.id,
          },
          data: {
            favoriteInterestId: interestId,
          },
          include: {
            favoriteInterest: true,
          },
        });

        mixpanel.track("Favorite Interest Updated", { updatedUser });

        return updatedUser?.id;
      },
    });
  },
});
