import { PrismaClient, User } from "@prisma/client";
import {
  extendType,
  mutationType,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from "nexus";
import bcrypt from "bcryptjs";
import Utilities from "../../../commonplace-utilities";

const prisma = new PrismaClient();

export const Mutation = mutationType({
  definition(t) {
    // t.crud.createOnePost();
    // t.crud.updateOneMessage();
    t.crud.createOneRecord();
  },
});
