import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

export const CreateReadRecordMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createReadRecord", {
      type: "Record",
      args: {
        username: nonNull(stringArg()),
        threadId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { username, threadId },
        { prisma, mixpanel }: Context
      ) => {
        console.info("Create Read Record", username, threadId);
        const record = prisma.record.create({
          data: {
            name: "readBy",
            content: username,
            thread: {
              connect: {
                id: threadId,
              },
            },
          },
        });

        console.info("Created record", record);

        return record;
      },
    });
  },
});
