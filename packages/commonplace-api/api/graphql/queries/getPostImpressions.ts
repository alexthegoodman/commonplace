import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const PostImpressionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("getPostImpressions", {
      type: "Message",
      args: {
        postTitle: nonNull(stringArg()),
      },
      resolve: async (_, { postTitle }, { prisma }: Context) => {
        const post = await prisma.post.findUnique({
          where: {
            generatedTitleSlug: postTitle,
          },
        });

        const impressions = await prisma.message.findMany({
          where: {
            post: {
              id: post?.id,
            },
            type: "impression",
          },
        });

        console.info("Get impressions", postTitle, post, impressions);

        return impressions;
      },
    });
  },
});
