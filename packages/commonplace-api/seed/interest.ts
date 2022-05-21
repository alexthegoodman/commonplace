import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";

const prisma = new PrismaClient();

export default async function seedInterests() {
  const getDefaultInterest = () => {
    return {
      name: "Test",
      contentType: "image",
    };
  };

  await prisma.interest.createMany({
    data: [
      getDefaultInterest(),
      getDefaultInterest(),
      getDefaultInterest(),
      getDefaultInterest(),
      getDefaultInterest(),
      getDefaultInterest(),
      getDefaultInterest(),
      getDefaultInterest(),
      getDefaultInterest(),
      getDefaultInterest(),
    ],
  });

  const interests = await prisma.interest.findMany();

  return {
    interests,
  };
}
