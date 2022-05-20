import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

export const MessageType = objectType({
  name: "Message",
  definition(t) {
    t.model.type();
    t.model.content();

    t.model.user();
    // t.model.thread();

    t.model.readBy();

    t.model.updatedAt();
    t.model.createdAt();
  },
});
