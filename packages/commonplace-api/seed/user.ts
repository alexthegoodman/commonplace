import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function seedUsers() {
  const getDefaultUser = () => {
    return {
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: "$2a$12$QG3qjuizq4bb24Gl2hhhSegdv7XHpv0nJrc1Fw/920gOMNSzn80A.", // testing
    };
  };

  const user1 = await prisma.user.create({
    data: {
      ...getDefaultUser(),
      email: "alexthegoodman@gmail.com",
    },
  });
  const user2 = await prisma.user.create({
    data: {
      ...getDefaultUser(),
    },
  });

  return {
    user1,
    user2,
  };
}
