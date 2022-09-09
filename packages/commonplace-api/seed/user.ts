import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import Utilities from "../../commonplace-utilities";
import { testImages } from "./post";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export default async function seedUsers() {
  const getDefaultUser = (providedEmail = "") => {
    const utilities = new Utilities();
    const email =
      providedEmail !== ""
        ? providedEmail
        : "alexthegoodman+" + nanoid() + "@gmail.com";
    const generatedUsername = utilities.helpers.emailToUsername(email);
    const randomInt1 = faker.random.numeric();
    const randomInt2 = faker.random.numeric();

    return {
      email,
      // name: faker.name.findName(), // NOTE: not currently set on frontend
      role: "USER",
      generatedUsername,
      chosenUsername: generatedUsername,
      profileImage: testImages[randomInt1],
      coverImage: testImages[randomInt2],
      password: "$2a$12$QG3qjuizq4bb24Gl2hhhSegdv7XHpv0nJrc1Fw/920gOMNSzn80A.", // testing
    };
  };

  await prisma.user.createMany({
    data: [
      {
        ...getDefaultUser("alexthegoodman@gmail.com"),
        role: "ADMIN",
      },
      getDefaultUser(),
      getDefaultUser(),
      getDefaultUser(),
      getDefaultUser(),
      getDefaultUser(),
      getDefaultUser(),
      getDefaultUser(),
      getDefaultUser(),
      getDefaultUser(),
    ],
  });

  const users = await prisma.user.findMany();

  // console.info("users", users);

  return {
    users,
  };
}
