import { objectType } from "nexus";
import { Context } from "../../context";
import { publicUserFields } from "./User";

export const MessageType = objectType({
  name: "Message",
  definition(t) {
    t.field("id", {
      type: "String",
    });

    t.field("type", {
      type: "String",
    });

    t.field("content", {
      type: "String",
    });

    // t.model.user();
    t.field("user", {
      type: "PublicUser",
      resolve: async (message, __, context: Context) => {
        return await context.prisma.user.findFirst({
          where: {
            messages: {
              some: {
                id: message.id as string,
              },
            },
          },
        });
      },
    });

    t.field("post", {
      type: "Post",
      resolve: async (message, __, context: Context) => {
        return await context.prisma.post.findFirst({
          where: {
            messages: {
              some: {
                id: message.id as string,
              },
            },
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
