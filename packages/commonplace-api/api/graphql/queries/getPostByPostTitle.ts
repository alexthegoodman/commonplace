import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicPostFields } from "../types/Post";

export const PostByPostTitleQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getPostByPostTitle", {
      type: "PublicPost",
      args: {
        postTitle: nonNull(stringArg()),
      },
      resolve: async (_, { postTitle }, { prisma }: Context) => {
        const post = await prisma.post.findFirst({
          where: {
            generatedTitleSlug: postTitle,
          },
          select: publicPostFields,
        });

        console.info("getPostsByPostTitle", postTitle, post);

        return post;
      },
    });
  },
});
