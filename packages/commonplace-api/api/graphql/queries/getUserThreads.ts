import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicPostFields } from "../types/Post";

export const UserThreadsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getUserThreads", {
      type: "Thread",
      args: {},
      resolve: async (_, {}, { prisma, currentUser }: Context) => {
        const threads = await prisma.thread.findMany({
          where: {
            users: {
              some: {
                id: {
                  equals: currentUser.id,
                },
              },
            },

            // EXCLUDE threads where messages are only from currentUser
            messages: {
              some: {
                userId: {
                  not: {
                    equals: currentUser.id,
                  },
                },
              },
            },
          },
          // orderBy: {
          //   messages: {
          //     createdAt: "desc",
          //   },
          //   threads: {
          //     createdAt: "desc",
          //   },
          // }
        });

        console.info("getUserThreads", threads);

        return threads;
      },
    });
  },
});
