import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import Mixpanel from "../mixpanel";

const prisma = new PrismaClient();
const mixpanel = new Mixpanel();

export interface Context {
  prisma: PrismaClient;
  mixpanel: Mixpanel;
  req: Request;
  currentUser: User;
}

export const context = {
  prisma,
  mixpanel,
};
