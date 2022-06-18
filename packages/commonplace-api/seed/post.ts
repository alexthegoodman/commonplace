import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import slugify from "slugify";

const prisma = new PrismaClient();

export const cloudfrontUrl = "https://d3ubks77jdbtp7.cloudfront.net";

const testImages = [
  "2022/06/courtney-cook-SsIIw_MET0E-unsplash-JzSY6496hv.jpg",
  "2022/06/jr-korpa-ma_PlENP8RE-unsplash-G3eVlSq2RL.jpg",
  "2022/06/melanie-kreutz-IFnknR2Mv5o-unsplash-C3wXqnvF55.jpg",
  "2022/06/nicola-powys-oz7w_okbI0Q-unsplash-OamYSkHP4H.jpg",
  "2022/06/xiaolong-wong-nibgG33H0F8-unsplash-6qv5c390cP.jpg",
  "2022/06/courtney-cook-SsIIw_MET0E-unsplash-JzSY6496hv.jpg",
  "2022/06/jr-korpa-ma_PlENP8RE-unsplash-G3eVlSq2RL.jpg",
  "2022/06/melanie-kreutz-IFnknR2Mv5o-unsplash-C3wXqnvF55.jpg",
  "2022/06/nicola-powys-oz7w_okbI0Q-unsplash-OamYSkHP4H.jpg",
  "2022/06/xiaolong-wong-nibgG33H0F8-unsplash-6qv5c390cP.jpg",
];

export default async function seedPosts(users, interests) {
  const getDefaultPost = (rep1 = -1, rep2 = -1) => {
    const randomInt1 = rep1 !== -1 ? rep1 : faker.random.numeric();
    const randomInt2 = rep2 !== -1 ? rep2 : faker.random.numeric();
    // const contentSearch = "design";
    // const contentHeight = parseInt(faker.random.numeric(3)) + 300;
    const title = faker.lorem.words();
    const generatedTitleSlug = slugify(title);
    const content = testImages[randomInt2];

    return {
      title,
      description: faker.lorem.lines(),
      contentType: "image",
      contentPreview: "",
      generatedTitleSlug,
      // content: faker.image.imageUrl(800, contentHeight, contentSearch),
      content,
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
