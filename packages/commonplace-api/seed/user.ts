import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function seedUsers() {
  const getDefaultUser = () => {
    return {
      email: faker.internet.email(),
      name: faker.name.findName(),
      profileImage: faker.image.imageUrl(1200, 800, "me"),
      coverImage: faker.image.imageUrl(800, 800, "travel"),
      password: "$2a$12$QG3qjuizq4bb24Gl2hhhSegdv7XHpv0nJrc1Fw/920gOMNSzn80A.", // testing
    };
  };

  await prisma.user.createMany({
    data: [
      {
        ...getDefaultUser(),
        email: "alexthegoodman@gmail.com",
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
