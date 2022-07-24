import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export default async function seedThreads(users, posts) {
  const getDefaultThread = () => {
    return {
      repliesAllowed: true,
      readHistory: {
        create: {
          name: "readBy",
          content: users[1].chosenUsername,
        },
      },
    };
  };

  const thread1 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      users: {
        connect: [{ id: users[0].id }, { id: users[1].id }],
      },

      messages: {
        create: [
          {
            type: "impression",
            content: "Dazzling",
            user: { connect: { id: users[0].id } },
            // readBy: { connect: { id: users[1].id } }, // include author?
            post: {
              connect: { id: posts[0].id },
            },
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
      users: {
        connect: [{ id: users[5].id }, { id: users[6].id }],
      },

      messages: {
        create: [
          {
            type: "impression",
            content: "Original",
            user: { connect: { id: users[5].id } },
            // readBy: { connect: { id: users[1].id } }, // include author?
            post: {
              connect: { id: posts[1].id },
            },
            // createdAt: DateTime.now().minus({ days: 1 }).toISO(),
          },
          {
            type: "reply",
            content: "This will stick with me",
            user: { connect: { id: users[6].id } },
            // createdAt: DateTime.now().minus({ days: 1 }).toISO(),
          },
        ],
      },
    },
  });

  const thread3 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      users: {
        connect: [{ id: users[2].id }, { id: users[3].id }],
      },

      messages: {
        create: [
          {
            type: "impression",
            content: "Classy",
            user: { connect: { id: users[2].id } },
            // readBy: { connect: { id: users[1].id } }, // include author?
            post: {
              connect: { id: posts[1].id },
            },
            createdAt: DateTime.now().minus({ days: 1 }).toISO(),
          },
          {
            type: "reply",
            content: "Another reply",
            user: { connect: { id: users[3].id } },
            createdAt: DateTime.now().minus({ days: 1 }).toISO(),
          },
        ],
      },
    },
  });

  const thread4 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      users: {
        connect: [{ id: users[6].id }, { id: users[7].id }],
      },

      messages: {
        create: [
          {
            type: "impression",
            content: "Spooky",
            user: { connect: { id: users[6].id } },
            // readBy: { connect: { id: users[1].id } }, // include author?
            post: {
              connect: { id: posts[1].id },
            },
            // createdAt: DateTime.now().minus({ months: 1 }).toISO(),
          },
          {
            type: "reply",
            content: "User reply",
            user: { connect: { id: users[7].id } },
            // createdAt: DateTime.now().minus({ months: 1 }).toISO(),
          },
        ],
      },
    },
  });

  const thread5 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      users: {
        connect: [{ id: users[3].id }, { id: users[4].id }],
      },

      messages: {
        create: [
          {
            type: "impression",
            content: "Fun",
            user: { connect: { id: users[3].id } },
            // readBy: { connect: { id: users[1].id } }, // include author?
            post: {
              connect: { id: posts[1].id },
            },
            createdAt: DateTime.now().minus({ months: 1 }).toISO(),
          },
          {
            type: "reply",
            content: "User reply",
            user: { connect: { id: users[4].id } },
            createdAt: DateTime.now().minus({ months: 1 }).toISO(),
          },
        ],
      },
    },
  });

  const thread6 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      users: {
        connect: [{ id: users[3].id }, { id: users[4].id }],
      },

      messages: {
        create: [
          {
            type: "impression",
            content: "Fun",
            user: { connect: { id: users[3].id } },
            // readBy: { connect: { id: users[1].id } }, // include author?
            post: {
              connect: { id: posts[1].id },
            },
            createdAt: DateTime.now().minus({ months: 2 }).toISO(),
          },
          {
            type: "reply",
            content: "User reply",
            user: { connect: { id: users[4].id } },
            createdAt: DateTime.now().minus({ months: 2 }).toISO(),
          },
        ],
      },
    },
  });

  const thread7 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      users: {
        connect: [{ id: users[8].id }, { id: users[9].id }],
      },

      messages: {
        create: [
          {
            type: "impression",
            content: "Fun",
            user: { connect: { id: users[8].id } },
            // readBy: { connect: { id: users[1].id } }, // include author?
            post: {
              connect: { id: posts[1].id },
            },
            createdAt: DateTime.now().minus({ months: 2 }).toISO(),
          },
          {
            type: "reply",
            content: "User reply",
            user: { connect: { id: users[9].id } },
            createdAt: DateTime.now().minus({ months: 2 }).toISO(),
          },
        ],
      },
    },
  });

  const thread8 = await prisma.thread.create({
    data: {
      ...getDefaultThread(),
      users: {
        connect: [{ id: users[3].id }, { id: users[4].id }],
      },

      messages: {
        create: [
          {
            type: "impression",
            content: "Fun",
            user: { connect: { id: users[3].id } },
            // readBy: { connect: { id: users[1].id } }, // include author?
            post: {
              connect: { id: posts[1].id },
            },
            createdAt: DateTime.now().minus({ months: 3 }).toISO(),
          },
          {
            type: "reply",
            content: "User reply",
            user: { connect: { id: users[4].id } },
            createdAt: DateTime.now().minus({ months: 3 }).toISO(),
          },
        ],
      },
    },
  });

  return {
    thread1,
    thread2,
    thread3,
  };
}
