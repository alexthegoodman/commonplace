import { PrismaClient } from "@prisma/client";
import { setupMixpanel } from "../mixpanel";

const prisma = new PrismaClient();
const mixpanel = setupMixpanel();

export interface Context {
  prisma: PrismaClient;
  mixpanel: any;
}

export const context = {
  prisma,
  mixpanel,
};
