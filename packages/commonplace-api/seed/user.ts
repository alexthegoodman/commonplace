import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import Utilities from "commonplace-utilities/lib";
import { testImages } from "./post";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

const profileImages = [
  "2022/09/ali-jouyandeh-bodgc6H44FA-unsplash-5DW97Z8rXK.jpg",
  "2022/09/deepak-rautela-4gM1CmY2qek-unsplash-P_7kOTJN3N.jpg",
  "2022/09/europeana-5TK1F5VfdIk-unsplash-Xzxh1YDfLv.jpg",
  "2022/09/europeana-L62U8oeBVgE-unsplash-QtrJ3UsfeZ.jpg",
  "2022/09/morgan-aragon-BFyTdSthQDA-unsplash-OEhxZL5RwY.jpg",
  "2022/09/nadine-burzler-FsXq3xu72bs-unsplash-1Z4sI3f1hR.jpg",
  "2022/09/prashant-saini-BeoRcYyVgxE-unsplash-9ZKrVR1Vg3.jpg",
  "2022/09/ruvim-noga-fyoGx76Cm7E-unsplash-RqVBCAtgF-.jpg",
  "2022/09/shuttergames-9BE8hiqvUM4-unsplash-IpoQ0BfHkU.jpg",
  "2022/09/thought-catalog-6tveVV8rRMo-unsplash-oWCDbuihSW.jpg",
];

const coverImages = [
  "2022/09/annie-spratt-PM4Vu1B0gxk-unsplash-3JZ433y5Mr.jpg",
  "2022/09/clark-tibbs-oqStl2L5oxI-unsplash-BOwRf2AP2F.jpg",
  "2022/09/freestocks-RgKmrxpIraY-unsplash-k97r_A7unw.jpg",
  "2022/09/gradienta-QWutu2BRpOs-unsplash-K4FrX5YEwx.jpg",
  "2022/09/jeet-dhanoa-XZgcJcBhSgM-unsplash-2bhN7xdOWu.jpg",
  "2022/09/jr-korpa-I0TaBAAwm9g-unsplash-tMt1idHmyw.jpg",
  "2022/09/markus-spiske-pZX9QPxeIQc-unsplash-plnCpohZfN.jpg",
  "2022/09/patrick-tomasso-QMDap1TAu0g-unsplash-XY3JPSLH0Y.jpg",
  "2022/09/simon-berger-twukN12EN7c-unsplash-t19qFqEgRp.jpg",
  "2022/09/vicko-mozara-m82uh_vamhg-unsplash-WkwbBFi2SR.jpg",
];

export default async function seedUsers() {
  const getDefaultUser = () => {
    const utilities = new Utilities();
    const email = "alexthegoodman+" + nanoid() + "@gmail.com";
    const generatedUsername = utilities.helpers.emailToUsername(email);
    const randomInt1 = faker.random.numeric();
    const randomInt2 = faker.random.numeric();

    return {
      email,
      role: "USER",
      generatedUsername,
      chosenUsername: generatedUsername,
      profileImage: profileImages[randomInt1],
      coverImage: coverImages[randomInt2],
      password: "$2a$12$QG3qjuizq4bb24Gl2hhhSegdv7XHpv0nJrc1Fw/920gOMNSzn80A.", // testing
      favoriteInterestId: null,
    };
  };

  await prisma.user.createMany({
    data: [
      {
        ...getDefaultUser(),
        email: "alexthegoodman@gmail.com",
        role: "ADMIN",
      },
      { ...getDefaultUser(), chosenUsername: "Color Gradienta" },
      { ...getDefaultUser(), chosenUsername: "Beijing Dishes" },
      { ...getDefaultUser(), chosenUsername: "dorvmachine" },
      { ...getDefaultUser(), chosenUsername: "amaksi" },
      { ...getDefaultUser(), chosenUsername: "endless future" },
      { ...getDefaultUser(), chosenUsername: "friendlycooker" },
      { ...getDefaultUser(), chosenUsername: "EverydayDrawing" },
      { ...getDefaultUser(), chosenUsername: "Leonell Cassio" },
      { ...getDefaultUser(), chosenUsername: "Cricket Master" },
    ],
  });

  const users = await prisma.user.findMany();

  // console.info("users", users);

  return {
    users,
  };
}
