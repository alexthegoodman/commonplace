import { extendType } from "nexus";
import { Context } from "../../context";

export const ProfileURLsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getProfileURLs", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma }: Context) => {
        const userNames = await prisma.user.findMany({
          select: {
            chosenUsername: true,
          },
        });

        const urls = userNames.map((user, i) => {
          return "/co/" + user.chosenUsername;
        });

        console.info("getProfileURLs", userNames, urls);

        return urls;
      },
    });
  },
});
