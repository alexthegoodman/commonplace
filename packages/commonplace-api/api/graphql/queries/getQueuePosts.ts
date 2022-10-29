import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicPostFields } from "../types/Post";

export const QueuePostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getQueuePosts", {
      type: "Post",
      args: {
        interestId: nullable(stringArg()),
      },
      resolve: async (_, { interestId }, { prisma, currentUser }: Context) => {
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
                equals: currentUser.id,
              },
            },
            // NOT posts with impression from currentUser
            messages: {
              none: {
                user: {
                  id: {
                    equals: currentUser.id,
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
          take: 1,
        });

        // console.info("getQueuePosts", posts);

        return posts;
      },
    });
  },
});
