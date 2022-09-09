import { extendType, nonNull, nullable, stringArg } from "nexus";
import Mandrill from "../../../../commonplace-utilities/lib/Mandrill";
import { Context } from "../../context";

export const CreateMessageMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createMessage", {
      type: "Message",
      args: {
        type: nonNull(stringArg()),
        content: nonNull(stringArg()),
        postCreatorUsername: nullable(stringArg()),
        postId: nullable(stringArg()),
        threadId: nullable(stringArg()),
      },
      resolve: async (
        _,
        { type, content, postCreatorUsername, postId, threadId },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        console.info(
          "createMessage",
          type,
          content,
          postCreatorUsername,
          threadId
        );

        const mandrill = new Mandrill();

        // const author = await prisma.user.findUnique({
        //   where: {
        //     generatedUsername: authorUsername,
        //   },
        // });

        let postCreator;
        if (postCreatorUsername) {
          postCreator = await prisma.user.findUnique({
            where: {
              generatedUsername: postCreatorUsername,
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
                  id: currentUser?.id,
                },
              },
            },
          });

          const otherUser = await prisma.user.findFirst({
            where: {
              AND: {
                threads: {
                  some: {
                    id: {
                      equals: threadId,
                    },
                  },
                },
                id: {
                  not: {
                    equals: currentUser.id,
                  },
                },
              },
            },
          });

          const emailUrl = "https://commonplace.social/updates/" + threadId;
          const buttonText = "Open Thread";

          mandrill.sendEmail(
            otherUser?.email,
            otherUser?.chosenUsername,
            "Reply Received",
            "notification",
            [
              {
                name: "subject",
                content: "Reply Received",
              },
              {
                name: "title",
                content: currentUser.chosenUsername + " sent you a message",
              },
              {
                name: "body",
                content: `"${content}"`,
              },
              {
                name: "notification-action-btn",
                content: `<a href="${emailUrl}" class="btn" style="background:#38f;border:none;border-radius:50px;box-shadow:none;color:#fff;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;height:auto;letter-spacing:.2px;line-height:18px;margin:0 auto 25px auto;max-width:360px;padding:11px 15px 12px 15px;text-align:center;text-decoration:none;text-transform:uppercase;width:80%">${buttonText}</a>`,
              },
            ]
          );

          mixpanel.track("Reply Sent");
        } else if (type === "impression" && postCreatorUsername && postId) {
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
                id: currentUser?.id,
              },
            },
          });

          console.info("checkMessage", checkMessage);

          if (checkMessage === null) {
            const newCredit = (currentUser?.credit as number) + 1;
            await prisma.user.update({
              where: {
                id: currentUser?.id,
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
                      in: [currentUser?.id, postCreator?.id],
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
                      connect: [
                        { id: currentUser?.id },
                        { id: postCreator?.id },
                      ],
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
                    id: currentUser?.id,
                  },
                },
                ...addtData,
              },
            });

            const emailUrl =
              "https://commonplace.social/updates/" + message.threadId;
            const buttonText = "Open Thread";

            mandrill.sendEmail(
              postCreator?.email,
              postCreator?.chosenUsername,
              "Feedback Received",
              "notification",
              [
                {
                  name: "subject",
                  content: "Feedback Received",
                },
                {
                  name: "title",
                  content:
                    currentUser.chosenUsername + " gave you their impression",
                },
                {
                  name: "body",
                  content: `"${content}"`,
                },
                {
                  name: "notification-action-btn",
                  content: `<a href="${emailUrl}" class="btn" style="background:#38f;border:none;border-radius:50px;box-shadow:none;color:#fff;cursor:pointer;display:block;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;height:auto;letter-spacing:.2px;line-height:18px;margin:0 auto 25px auto;max-width:360px;padding:11px 15px 12px 15px;text-align:center;text-decoration:none;text-transform:uppercase;width:80%">${buttonText}</a>`,
                },
              ]
            );
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
