import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function seedThreads(user1, user2, post1, post2, post3) {
  const getDefaultThread = () => {
    return {
      repliesAllowed: true,
      users: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    };
  };

  const thread1 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      post: {
        connect: { id: post1.id },
      },
      messages: {
        create: [
          {
            type: "impression",
            content: "Dazzling",
            user: { connect: { id: user1.id } },
            readBy: { connect: { id: user2.id } }, // include author?
          },
          {
            type: "reply",
            content: "Thank you!!",
            user: { connect: { id: user2.id } },
          },
        ],
      },
    },
  });

  const thread2 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      post: {
        connect: { id: post2.id },
      },
      messages: {
        create: [
          {
            type: "impression",
            content: "Original",
            user: { connect: { id: user1.id } },
            readBy: { connect: { id: user2.id } }, // include author?
          },
          {
            type: "reply",
            content: "This will stick with me",
            user: { connect: { id: user2.id } },
          },
        ],
      },
    },
  });

  return {
    thread1,
    thread2,
  };
}
