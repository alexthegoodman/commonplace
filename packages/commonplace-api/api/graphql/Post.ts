import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const PostType = objectType({
  name: "Post",
  definition(t) {
    // t.string("title"); // do not expose
  },
});
