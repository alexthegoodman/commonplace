import { extendType } from "nexus";
import { Context } from "../../context";

export const DashboardDataQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getDashboardData", {
      type: "Dashboard",
      args: {},
      resolve: async (_, {}, { prisma }: Context) => {
        return {};
      },
    });
  },
});
