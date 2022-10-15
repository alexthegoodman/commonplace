import { extendType } from "nexus";
import { Context } from "../../context";

export const DashboardPostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getDashboardPosts", {
      type: "ManagePost",
      args: {},
      resolve: async (_, {}, { prisma }: Context) => {
        const posts = await prisma.post.findMany({
          where: {
            id: {
              not: "",
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return posts;
      },
    });
  },
});
