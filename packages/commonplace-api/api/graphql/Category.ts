import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const CategoryType = objectType({
  name: "Category",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.interests();
  },
});
