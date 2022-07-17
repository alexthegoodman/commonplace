import { extendType } from "nexus";
import { Context } from "../../context";

export const PostURLsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getPostURLs", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma }: Context) => {
        const slugs = await prisma.post.findMany({
          select: {
            generatedTitleSlug: true,
            interest: true,
          },
        });

        const urls = slugs.map((user, i) => {
          return (
            "/" +
            user.interest.generatedInterestSlug +
            "/" +
            user.generatedTitleSlug
          );
        });

        console.info("getPostURLs", slugs, urls);

        return urls;
      },
    });
  },
});