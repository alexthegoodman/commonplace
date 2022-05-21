import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function seedPosts(users, interests) {
  const getDefaultPost = (rep1 = -1, rep2 = -1) => {
    const randomInt1 = rep1 !== -1 ? rep1 : faker.random.numeric();
    const randomInt2 = rep2 !== -1 ? rep2 : faker.random.numeric();

    return {
      title: faker.lorem.words(),
      description: faker.lorem.lines(),
      contentType: "image",
      contentPreview: "",
      content: faker.image.imageUrl(800, 800, "landscape painting"),
      interestId: interests[randomInt1].id,
      creatorId: users[randomInt2].id,
    };
  };

  await prisma.post.createMany({
    data: [
      getDefaultPost(0, 0),
      getDefaultPost(),
      getDefaultPost(),
      getDefaultPost(),
      getDefaultPost(),
      getDefaultPost(),
      getDefaultPost(),
      getDefaultPost(),
      getDefaultPost(),
      getDefaultPost(),
    ],
  });

  const posts = await prisma.post.findMany();

  return {
    posts,
  };
}
