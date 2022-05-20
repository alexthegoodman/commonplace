import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const ThreadType = objectType({
  name: "Thread",
  definition(t) {
    // t.string("title"); // do not expose
  },
});
