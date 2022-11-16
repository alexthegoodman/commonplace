import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const ToggleFavoriteMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("toggleFavorite", {
      type: "String",
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { postId },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        console.info("toggleFavorite", postId);

        const currentFavorite = await prisma.favorite.findFirst({
          where: {
            post: {
              id: {
                equals: postId,
              },
            },
            user: {
              id: {
                equals: currentUser.id,
              },
            },
          },
        });

        if (currentFavorite && typeof currentFavorite !== "undefined") {
          await prisma.favorite.delete({
            where: {
              id: currentFavorite.id,
            },
          });
        } else {
          await prisma.favorite.create({
            data: {
              post: {
                connect: {
                  id: postId,
                },
              },
              user: {
                connect: {
                  id: currentUser.id,
                },
              },
            },
          });
        }

        console.info("Toggled favorite", currentFavorite);

        mixpanel.track("Toggled Favorite", { currentFavorite });

        return "success";
      },
    });
  },
});
