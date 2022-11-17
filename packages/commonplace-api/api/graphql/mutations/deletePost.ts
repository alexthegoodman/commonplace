import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const DeletePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deletePost", {
      type: "String",
      args: {
        postTitleSlug: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { postTitleSlug },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        console.info("Delete Post", postTitleSlug);

        const userPost = await prisma.post.findFirst({
          where: {
            generatedTitleSlug: postTitleSlug,
            creator: {
              id: currentUser.id,
            },
          },
        });

        console.info("userPost", userPost);

        const post = await prisma.post.delete({
          where: {
            id: userPost?.id,
          },
        });

        mixpanel.track("Post Deleted", { post });

        console.info("Deleted post", post);

        return "deleted";
      },
    });
  },
});
