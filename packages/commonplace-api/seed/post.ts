import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import slugify from "slugify";

const prisma = new PrismaClient();

export const cloudfrontUrl = "https://d3ubks77jdbtp7.cloudfront.net";

export const testImages = [
  "2022/09/painting2-kQSyfRpjrn.jpg",
  "2022/09/painting1-LLoc8uvOLy.jpg",
  "2022/09/drawing2-kDyehrpfOB.jpg",
  "2022/09/drawing1-1Mdb4o6vu5.jpg",
  "2022/09/sports2-yuxXQHCuf_.jpg",
  "2022/09/sports1-HLXSpjv8hn.jpg",
];

export default async function seedPosts(users, interests) {
  await prisma.post.createMany({
    data: [
      {
        title: "The Willow House",
        description:
          "As shifting forms become distorted through emergent and critical practice, the viewer is left with an epitaph for the outposts of our era.",
        contentType: "image",
        contentPreview: "",
        generatedTitleSlug: slugify("The Willow House"),
        content: testImages[0],
        interestId: interests.filter(
          (interest) => interest.name === "Painting"
        )[0].id,
        creatorId: users[1].id,
      },
      {
        title: "Chinese Stir Fry",
        description: "It builds depth and complexity",
        contentType: "video",
        contentPreview: "",
        generatedTitleSlug: slugify("Chinese Stir Fry"),
        content: "2022/09/Chinese - 11700-h-faAYfQRj.mp4",
        interestId: interests.filter(
          (interest) => interest.name === "Chinese"
        )[0].id,
        creatorId: users[2].id,
      },
      {
        title: "Like a Starry Night",
        description: "",
        contentType: "image",
        contentPreview: "",
        generatedTitleSlug: slugify("Like a Starry Night"),
        content: testImages[1],
        interestId: interests.filter(
          (interest) => interest.name === "Painting"
        )[0].id,
        creatorId: users[3].id,
      },
      {
        title: "Tuesday (GlitchSoftHip-hop)",
        description:
          "My work explores the relationship between Critical theory and UFO sightings.",
        contentType: "audio",
        contentPreview: "2022/09/music1-Hdz1r_1-QH.jpg",
        generatedTitleSlug: slugify("Tuesday (GlitchSoftHip-hop)"),
        content:
          "2022/09/Tuesday-(GlitchSoftHip-hop)-amaksi-pixabay-HIlQb3bzGW.mp3",
        interestId: interests.filter(
          (interest) => interest.name === "Electronic"
        )[0].id,
        creatorId: users[4].id,
      },
      {
        title: "The Elements as One",
        description:
          "The Elements explores the relationship between earth, wind, and sea.",
        contentType: "image",
        contentPreview: "",
        generatedTitleSlug: slugify("The Elements as One"),
        content: testImages[2],
        interestId: interests.filter(
          (interest) => interest.name === "Drawing"
        )[0].id,
        creatorId: users[5].id,
      },
      {
        title: "Chop Master!",
        description: "Chopping some food. Hope you like",
        contentType: "video",
        contentPreview: "",
        generatedTitleSlug: slugify("Chop Master!"),
        content: "2022/09/Chop - 11638-f7vKlmN_8v.mp4",
        interestId: interests.filter(
          (interest) => interest.name === "Cooking"
        )[0].id,
        creatorId: users[6].id,
      },
      {
        title: "Happy Flower",
        description: "",
        contentType: "image",
        contentPreview: "",
        generatedTitleSlug: slugify("Happy Flower"),
        content: testImages[3],
        interestId: interests.filter(
          (interest) => interest.name === "Drawing"
        )[0].id,
        creatorId: users[7].id,
      },
      {
        title: "The Blackest Bouquet",
        description:
          "As momentary derivatives become clarified through emergent and repetitive practice, the viewer is left with a testament to the darkness of our existence.",
        contentType: "audio",
        contentPreview: "2022/09/music2-pyPLFtD0mN.jpg",
        generatedTitleSlug: slugify("audio #2"),
        content:
          "2022/09/Leonell-Cassio-TheBlackestBouquet-LeonellCassio-pixabay-7i7XmfbUVN.mp3",
        interestId: interests.filter(
          (interest) => interest.name === "Electronic"
        )[0].id,
        creatorId: users[8].id,
      },
      {
        title: "Practice 03",
        description: "",
        contentType: "image",
        contentPreview: "",
        generatedTitleSlug: slugify("Practice 03"),
        content: testImages[4],
        interestId: interests.filter(
          (interest) => interest.name === "Cricket"
        )[0].id,
        creatorId: users[9].id,
      },
      {
        title: "Practice 04",
        description: "",
        contentType: "image",
        contentPreview: "",
        generatedTitleSlug: slugify("Practice 04"),
        content: testImages[5],
        interestId: interests.filter(
          (interest) => interest.name === "Cricket"
        )[0].id,
        creatorId: users[9].id,
      },
      // {
      //   ...getDefaultPost(0, 0),
      //   contentType: "video",
      //   contentPreview: "", // TODO: add for video?
      //   content: "http://localhost:3000/test/cheetah.mp4",
      // },
      // {
      //   ...getDefaultPost(1, 0),
      //   contentType: "image",
      //   contentPreview: "",
      //   content: "http://localhost:3000/test/cheetahPoster.jpeg",
      // },
      // {
      //   ...getDefaultPost(1, 0),
      //   contentType: "audio",
      //   contentPreview: "http://localhost:3000/test/cheetahPoster.jpeg",
      //   content: "http://localhost:3000/test/cheetah.mp3",
      // },
      // {
      //   ...getDefaultPost(),
      //   contentType: "text",
      //   contentPreview: "",
      //   content: `greetings \n\nthis is a poem \n\nwith many words of kindness and wishes of wisdom \nand good things \n\nthank you`,
      // },
    ],
  });

  const posts = await prisma.post.findMany();

  return {
    posts,
  };
}
