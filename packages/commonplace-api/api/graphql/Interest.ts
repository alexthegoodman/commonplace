import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const InterestType = objectType({
  name: "Interest",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.generatedInterestSlug();
    t.model.categories();
  },
});
