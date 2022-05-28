import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const ThreadType = objectType({
  name: "Thread",
  definition(t) {
    t.model.id();
    t.model.repliesAllowed();

    // t.model.post();
    t.model.users();
    t.model.messages({
      ordering: true,
    });

    t.model.updatedAt();
    t.model.createdAt();
  },
});
