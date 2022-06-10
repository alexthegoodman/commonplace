import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, nullable, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const MessageType = objectType({
  name: "Message",
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.content();

    t.model.user();
    t.model.post();
    // t.model.thread();

    // t.model.readBy();

    t.model.updatedAt();
    t.model.createdAt();
  },
});

export const PostImpressionsQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("getPostImpressions", {
      type: "Message",
      args: {
        postTitle: nonNull(stringArg()),
      },
      resolve: async (_, { postTitle }, { prisma: PrismaClient }) => {
        const post = await prisma.post.findUnique({
          where: {
            generatedTitleSlug: postTitle,
          },
        });

        const impressions = await prisma.message.findMany({
          where: {
            post: {
              id: post?.id,
            },
            type: "impression",
          },
        });

        console.info("Get impressions", postTitle, post, impressions);

        return impressions;
      },
    });
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
        postCreatorEmail: nullable(stringArg()),
        postId: nullable(stringArg()),
        threadId: nullable(stringArg()),
      },
      resolve: async (
        _,
        { type, content, authorEmail, postCreatorEmail, postId, threadId },
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
        } else if (type === "impression" && postCreatorEmail && postId) {
          // TODO: securely add credit to currentUser when creaating impression
          // best to check that impression has not been given by this user on this posts
          // before creating imp or credit (as 2 is not allowed anyway)
          const checkMessage = await prisma.message.findFirst({
            where: {
              type,
              post: {
                id: postId,
              },
              user: {
                id: author?.id,
              },
            },
          });

          console.info("checkMessage", checkMessage);

          if (checkMessage === null) {
            const newCredit = (author?.credit as number) + 1;
            await prisma.user.update({
              where: {
                id: author?.id,
              },
              data: {
                credit: newCredit,
              },
            });

            message = await prisma.message.create({
              data: {
                type,
                content,
                post: {
                  connect: {
                    id: postId,
                  },
                },
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
          } else {
            throw Error("Cannot give impression to same post twice");
          }
        }

        console.info("Created message", message);

        return message;
      },
    });
  },
});
