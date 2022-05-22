import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function seedPosts(users, interests) {
  const getDefaultPost = (rep1 = -1, rep2 = -1) => {
    const randomInt1 = rep1 !== -1 ? rep1 : faker.random.numeric();
    const randomInt2 = rep2 !== -1 ? rep2 : faker.random.numeric();
    const contentSearch = faker.vehicle.vehicle();

    return {
      title: faker.lorem.words(),
      description: faker.lorem.lines(),
      contentType: "image",
      contentPreview: "",
      content: faker.image.imageUrl(800, 800, contentSearch),
      interestId: interests[randomInt1].id,
      creatorId: users[randomInt2].id,
    };
  };

  await prisma.post.createMany({
    data: [
      {
        ...getDefaultPost(0, 0),
        contentType: "video",
        contentPreview: "", // TODO: add for video?
        content: "http://localhost:3000/test/cheetah.mp4",
      },
      {
        ...getDefaultPost(1, 0),
        contentType: "image",
        contentPreview: "",
        content: "http://localhost:3000/test/cheetahPoster.jpeg",
      },
      {
        ...getDefaultPost(1, 0),
        contentType: "audio",
        contentPreview: "http://localhost:3000/test/cheetahPoster.jpeg",
        content: "http://localhost:3000/test/cheetah.mp3",
      },
      {
        ...getDefaultPost(),
        contentType: "text",
        contentPreview: "",
        content: `greetings \n\n this is a poem \n 
          with many words of kindness \n 
          and good things \n\n thank you`,
      },
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
