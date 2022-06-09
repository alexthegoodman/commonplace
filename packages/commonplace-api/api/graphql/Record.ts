import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const RecordType = objectType({
  name: "Record",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.content();
    t.model.updatedAt();
    t.model.createdAt();
  },
});
