import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicPostFields } from "../types/Post";

export const QueuePostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getQueuePosts", {
      type: "PublicPost",
      args: {
        interestId: nonNull(stringArg()),
      },
      resolve: async (_, { interestId }, { prisma }: Context) => {
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
            // NOT currentUser's posts
            creatorId: {
              not: {
                equals: userId,
              },
            },
            // NOT posts with impression from currentUser
            messages: {
              none: {
                user: {
                  id: {
                    equals: userId,
                  },
                },
                type: {
                  equals: "impression",
                },
              },
            },
            ...addtPostFilter,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        console.info("getQueuePosts", posts);

        return posts;
      },
    });
  },
});
