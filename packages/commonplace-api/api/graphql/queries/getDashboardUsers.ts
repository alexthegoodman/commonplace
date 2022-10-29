import { extendType } from "nexus";
import { Context } from "../../context";

export const DashboardUsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getDashboardUsers", {
      type: "User",
      args: {},
      resolve: async (_, {}, { prisma }: Context) => {
        const users = await prisma.user.findMany({
          where: {
            id: {
              not: "",
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        return users;
      },
    });
  },
});
