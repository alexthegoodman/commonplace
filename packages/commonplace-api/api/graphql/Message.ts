import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const MessageType = objectType({
  name: "Message",
  definition(t) {
    t.model.type();
    t.model.content();

    t.model.user();
    t.model.post();
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
        postCreatorEmail: stringArg(),
        threadId: stringArg(),
      },
      resolve: async (
        _,
        { type, content, authorEmail, postCreatorEmail, threadId },
        { prisma: PrismaClient }
      ) => {
        console.info(
          "createMessage",
          type,
          content,
          authorEmail,
          postCreatorEmail,
          threadId
        );

        const author = await prisma.user.findUnique({
          where: {
            email: authorEmail,
          },
        });

        let postCreator;
        if (postCreatorEmail) {
          postCreator = await prisma.user.findUnique({
            where: {
              email: postCreatorEmail,
            },
          });
        }

        // TODO: sanitize content (?)
        // NOTE: are all fields sanitized?

        let message;

        if (type === "reply" && threadId) {
          message = await prisma.message.create({
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
        } else if (type === "impression" && postCreatorEmail) {
          message = await prisma.message.create({
            data: {
              type,
              content,
              thread: {
                create: {
                  repliesAllowed: true,
                  users: {
                    connect: [{ id: author?.id }, { id: postCreator?.id }],
                  },
                },
              },
              user: {
                connect: {
                  id: author?.id,
                },
              },
            },
          });
        }

        console.info("Created message", message);

        return message;
      },
    });
  },
});
