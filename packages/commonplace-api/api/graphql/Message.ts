import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const MessageType = objectType({
  name: "Message",
  definition(t) {
    t.model.type();
    t.model.content();

    t.model.user();
    // t.model.thread();

    t.model.readBy();

    t.model.updatedAt();
    t.model.createdAt();
  },
});

export const CreateMessageMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createMessage", {
      type: "Message",
      args: {
        type: nonNull(stringArg()),
        content: nonNull(stringArg()),
        authorEmail: nonNull(stringArg()),
        threadId: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { type, content, authorEmail, threadId },
        { prisma: PrismaClient }
      ) => {
        console.info("createMessage", type, content, authorEmail, threadId);

        const author = await prisma.user.findUnique({
          where: {
            email: authorEmail,
          },
        });

        // TODO: sanitize content (?)
        // NOTE: are all fields sanitized?

        const message = await prisma.message.create({
          data: {
            type,
            content,
            thread: {
              connect: {
                id: threadId,
              },
            },
            user: {
              connect: {
                id: author?.id,
              },
            },
          },
        });

        console.info("Created message", message);

        return message;
      },
    });
  },
});
