import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import slugify from "slugify";

const prisma = new PrismaClient();

export default async function seedPosts(users, interests) {
  const getDefaultPost = (rep1 = -1, rep2 = -1) => {
    const randomInt1 = rep1 !== -1 ? rep1 : faker.random.numeric();
    const randomInt2 = rep2 !== -1 ? rep2 : faker.random.numeric();
    const contentSearch = "design";
    const contentHeight = parseInt(faker.random.numeric(3)) + 300;
    const title = faker.lorem.words();
    const generatedTitleSlug = slugify(title);

    return {
      title,
      description: faker.lorem.lines(),
      contentType: "image",
      contentPreview: "",
      generatedTitleSlug,
      content: faker.image.imageUrl(800, contentHeight, contentSearch),
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
        content: `greetings \n\nthis is a poem \n\nwith many words of kindness and wishes of wisdom \nand good things \n\nthank you`,
      },
      getDefaultPost(),
      getDefaultPost(),
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
