import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicPostFields } from "../types/Post";

export const ExplorePostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getExplorePosts", {
      type: "Post",
      args: {
        interestId: nullable(stringArg()),
        page: intArg(),
      },
      resolve: async (
        _,
        { interestId, page },
        { prisma, currentUser }: Context
      ) => {
        let addtPostFilter = {};

        if (interestId) {
          addtPostFilter = {
            interestId: {
              equals: interestId,
            },
          };
        }

        const posts = await prisma.post.findMany({
          where: {
            id: {
              not: "",
            },
            ...addtPostFilter,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 20,
          skip: 20 * page - 1,
        });

        // console.info("getExplorePosts", posts);

        return posts;
      },
    });
  },
});
