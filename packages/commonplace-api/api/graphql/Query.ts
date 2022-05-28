import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, queryType, stringArg } from "nexus";
import bcrypt from "bcryptjs";
import Utilities from "../../../commonplace-utilities";

const prisma = new PrismaClient();

export const Query = queryType({
  definition(t) {
    // NOTE: no filtering except by id, CRUD unnecessary
    // t.crud.user();

    // NOTE: not protected
    t.crud.post();

    // NOTE: only accesseble via id or user query
    t.crud.thread();

    // NOTE: not protected, better accessed via interest query?
    // paginate?
    t.crud.posts({ filtering: true });

    // NOTE: not protected
    t.crud.categories();

    // NOTE: not protected
    t.crud.interests();
  },
});
