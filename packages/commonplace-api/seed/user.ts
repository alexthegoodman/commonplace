import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import Utilities from "../../commonplace-utilities";

const prisma = new PrismaClient();

export default async function seedUsers() {
  const getDefaultUser = (providedEmail = "") => {
    const utilities = new Utilities();
    const email = providedEmail !== "" ? providedEmail : faker.internet.email();
    const generatedUsername = utilities.helpers.emailToUsername(email);

    return {
      email,
      // name: faker.name.findName(), // NOTE: not currently set on frontend
      generatedUsername,
      chosenUsername: generatedUsername,
      profileImage: faker.image.imageUrl(1200, 800, "me"),
      coverImage: faker.image.imageUrl(800, 800, "travel"),
      password: "$2a$12$QG3qjuizq4bb24Gl2hhhSegdv7XHpv0nJrc1Fw/920gOMNSzn80A.", // testing
    };
  };

  await prisma.user.createMany({
    data: [
      {
        ...getDefaultUser("alexthegoodman@gmail.com"),
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
