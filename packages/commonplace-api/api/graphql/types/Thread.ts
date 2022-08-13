import { objectType } from "nexus";
import { Context } from "../../context";

export const ThreadType = objectType({
  name: "Thread",
  definition(t) {
    t.field("id", {
      type: "String",
    });

    t.field("repliesAllowed", {
      type: "Boolean",
    });

    t.list.field("users", {
      type: "PublicUser",
      resolve: async (thread, __, context: Context) => {
        return await context.prisma.user.findMany({
          where: {
            threads: {
              some: {
                id: thread.id,
              },
            },
          },
        });
      },
    });

    t.list.field("messages", {
      type: "Message",
      resolve: async (thread, __, context: Context) => {
        return await context.prisma.message.findMany({
          where: {
            thread: {
              id: thread.id,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    });

    t.list.field("readHistory", {
      type: "Record",
      resolve: async (thread, __, context: Context) => {
        return await context.prisma.record.findMany({
          where: {
            thread: {
              id: thread.id,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      },
    });

    t.field("updatedAt", {
      type: "DateTime",
    });

    t.field("createdAt", {
      type: "DateTime",
    });
  },
});
