import { PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import slugify from "slugify";
import { SeedInterests } from "./interests";

const prisma = new PrismaClient();

export default async function seedInterests() {
  await prisma.category.createMany({
    data: SeedInterests.map((category, i) => {
      const name = category.title;
      const generatedCategorySlug = slugify(name);

      return {
        name,
        generatedCategorySlug,
      };
    }),
  });

  const createManyInterests = SeedInterests.forEach(async (category, i) => {
    const name = category.title;
    const generatedCategorySlug = slugify(name);

    const items = Array.from(category.items);
    items.map(async (interest, x) => {
      const name = interest;
      const generatedInterestSlug = slugify(name);

      await prisma.interest.create({
        data: {
          name,
          generatedInterestSlug,
          contentType: "",
          categories: {
            connect: {
              generatedCategorySlug,
            },
          },
        },
      });
    });
  });

  const categories = await prisma.category.findMany({
    include: {
      interests: true,
    },
  });

  const interests = await prisma.interest.findMany();

  return {
    categories,
    interests,
  };
}

// export default async function seedInterests() {
//   const getDefaultCategory = () => {
//     const name = faker.lorem.words();
//     const generatedCategorySlug = slugify(name);

//     return {
//       name,
//       generatedCategorySlug,
//     };
//   };

//   const category1 = await prisma.category.create({
//     data: getDefaultCategory(),
//   });

//   const category2 = await prisma.category.create({
//     data: getDefaultCategory(),
//   });

//   const category3 = await prisma.category.create({
//     data: getDefaultCategory(),
//   });

//   const getDefaultInterest = (category) => {
//     const name = faker.lorem.words();
//     const generatedInterestSlug = slugify(name);

//     return {
//       name,
//       generatedInterestSlug,
//       contentType: "",
//       categories: {
//         connect: {
//           id: category.id,
//         },
//       },
//     };
//   };

//   const interest1 = await prisma.interest.create({
//     data: getDefaultInterest(category1),
//   });

//   const interest2 = await prisma.interest.create({
//     data: getDefaultInterest(category2),
//   });

//   const interest3 = await prisma.interest.create({
//     data: getDefaultInterest(category3),
//   });

//   const interest4 = await prisma.interest.create({
//     data: getDefaultInterest(category1),
//   });

//   const interest5 = await prisma.interest.create({
//     data: getDefaultInterest(category1),
//   });

//   const interest6 = await prisma.interest.create({
//     data: getDefaultInterest(category2),
//   });

//   const interest7 = await prisma.interest.create({
//     data: getDefaultInterest(category3),
//   });

//   const interest8 = await prisma.interest.create({
//     data: getDefaultInterest(category1),
//   });

//   const interest9 = await prisma.interest.create({
//     data: getDefaultInterest(category3),
//   });

//   const interest10 = await prisma.interest.create({
//     data: getDefaultInterest(category1),
//   });

//   const interests = await prisma.interest.findMany();

//   return {
//     interests,
//   };
// }
