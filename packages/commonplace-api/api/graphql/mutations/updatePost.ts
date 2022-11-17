import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const UpdatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updatePost", {
      type: "Post",
      args: {
        postTitleSlug: nonNull(stringArg()),
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { postTitleSlug, title, description },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        console.info("Update Post", title, description);

        const userPost = await prisma.post.findFirst({
          where: {
            generatedTitleSlug: postTitleSlug,
            creator: {
              id: currentUser.id,
            },
          },
        });

        console.info("userPost", userPost);

        const post = await prisma.post.update({
          where: {
            id: userPost?.id,
          },
          data: {
            title,
            description,
          },
        });

        mixpanel.track("Post Updated", { post });

        console.info("Updated post", post);

        return post;
      },
    });
  },
});
