import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.model.title();
    t.model.description();

    t.model.contentType();
    t.model.contentPreview();
    t.model.content();

    t.model.interest();
    // t.model.modifiers();

    t.model.creator();
    t.model.threads();

    t.model.updatedAt();
    t.model.createdAt();
  },
});
