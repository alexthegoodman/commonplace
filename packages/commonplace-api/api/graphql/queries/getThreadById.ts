import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicPostFields } from "../types/Post";

export const ThreadByIdQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getThreadById", {
      type: "Thread",
      args: {
        threadId: nonNull(stringArg()),
      },
      resolve: async (_, { threadId }, { prisma, currentUser }: Context) => {
        const thread = await prisma.thread.findFirst({
          where: {
            id: threadId,
          },
        });

        console.info("getThreadById", thread);

        return thread;
      },
    });
  },
});
