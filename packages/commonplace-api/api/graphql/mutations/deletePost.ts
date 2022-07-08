import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const DeletePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deletePost", {
      type: "String",
      args: {
        creatorId: nonNull(stringArg()),
        postTitleSlug: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { creatorId, postTitleSlug },
        { prisma, mixpanel }: Context
      ) => {
        console.info("Delete Post", creatorId, postTitleSlug);

        const userPost = await prisma.post.findFirst({
          where: {
            generatedTitleSlug: postTitleSlug,
            creator: {
              id: creatorId,
            },
          },
        });

        console.info("userPost", userPost);

        const post = await prisma.post.delete({
          where: {
            id: userPost?.id,
          },
        });

        mixpanel.track("Post Deleted");

        console.info("Deleted post", post);

        return "deleted";
      },
    });
  },
});
