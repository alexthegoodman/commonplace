import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function seedPosts(user1, user2) {
  const getDefaultPost = () => {
    return {
      title: faker.lorem.words(),
      description: "",
      contentType: "image",
      contentPreview: "",
      content: faker.image.imageUrl(800, 800, "landscape painting"),
      interest: {
        create: {
          name: faker.lorem.words(),
          contentType: "image",
        },
      },
      creator: {
        connect: {
          id: user1.id,
        },
      },
    };
  };

  const post1 = await prisma.post.create({
    data: {
      ...getDefaultPost(),
    },
  });
  const post2 = await prisma.post.create({
    data: {
      ...getDefaultPost(),
    },
  });
  const post3 = await prisma.post.create({
    data: {
      ...getDefaultPost(),
    },
  });

  return {
    post1,
    post2,
    post3,
  };
}
