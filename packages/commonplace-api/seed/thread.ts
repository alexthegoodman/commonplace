import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function seedThreads(users, posts) {
  const getDefaultThread = () => {
    return {
      repliesAllowed: true,
      users: {
        connect: [{ id: users[0].id }, { id: users[0].id }],
      },
    };
  };

  const thread1 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      post: {
        connect: { id: posts[0].id },
      },
      messages: {
        create: [
          {
            type: "impression",
            content: "Dazzling",
            user: { connect: { id: users[0].id } },
            readBy: { connect: { id: users[1].id } }, // include author?
          },
          {
            type: "reply",
            content: "Thank you!!",
            user: { connect: { id: users[1].id } },
          },
        ],
      },
    },
  });

  const thread2 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      post: {
        connect: { id: posts[1].id },
      },
      messages: {
        create: [
          {
            type: "impression",
            content: "Original",
            user: { connect: { id: users[0].id } },
            readBy: { connect: { id: users[1].id } }, // include author?
          },
          {
            type: "reply",
            content: "This will stick with me",
            user: { connect: { id: users[1].id } },
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
