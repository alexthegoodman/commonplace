import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

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
        { prisma, mixpanel }: Context
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

          mixpanel.track("Reply Sent");
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

            // TODO: add impressions to previous thread if exists
            const threadExists = await prisma.thread.findFirst({
              where: {
                users: {
                  every: {
                    id: {
                      in: [author?.id, postCreator?.id],
                    },
                  },
                },
              },
            });

            console.info("threadExists", threadExists);

            let addtData = {
              thread: {},
            };
            if (threadExists) {
              addtData = {
                thread: {
                  connect: {
                    id: threadExists?.id,
                  },
                },
              };
            } else {
              addtData = {
                thread: {
                  create: {
                    repliesAllowed: true,
                    users: {
                      connect: [{ id: author?.id }, { id: postCreator?.id }],
                    },
                  },
                },
              };
            }

            message = await prisma.message.create({
              data: {
                type,
                content,
                post: {
                  connect: {
                    id: postId,
                  },
                },
                user: {
                  connect: {
                    id: author?.id,
                  },
                },
                ...addtData,
              },
            });
          } else {
            throw Error("Cannot give impression to same post twice");
          }

          mixpanel.track("Impression Sent");
        }

        console.info("Created message", message);

        return message;
      },
    });
  },
});
