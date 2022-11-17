import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const DeletePostAdminMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deletePostAdmin", {
      type: "String",
      args: {
        postId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { postId },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        console.info("Delete Post", postId);

        const post = await prisma.post.delete({
          where: {
            id: postId,
          },
        });

        mixpanel.track("Post Deleted by Admin", { post });

        console.info("Deleted post", post);

        return "deleted";
      },
    });
  },
});
