import { extendType, nonNull, nullable, stringArg } from "nexus";
import Mandrill from "commonplace-utilities/src/Mandrill";
import { Context } from "../../context";

export const CreateMessageMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createMessage", {
      type: "Message",
      args: {
        content: nonNull(stringArg()),
        threadId: nullable(stringArg()),
      },
      resolve: async (
        _,
        { content, threadId },
        { prisma, mixpanel, currentUser }: Context
      ) => {
        console.info("createMessage", content, threadId);

        const mandrill = new Mandrill();

        let message;

        if (threadId) {
          message = await prisma.message.create({
            data: {
              type: "reply",
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
        }

        console.info("Created message", message);

        return message;
      },
    });
  },
});
