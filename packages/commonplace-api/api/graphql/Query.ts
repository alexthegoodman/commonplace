import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, queryType, stringArg } from "nexus";
import bcrypt from "bcryptjs";
import Utilities from "../../../commonplace-utilities";

const prisma = new PrismaClient();

export const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.post();
    t.crud.thread();

    t.crud.posts();

    t.crud.categories();
    t.crud.interests();
  },
});
