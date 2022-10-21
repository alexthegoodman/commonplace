import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicPostFields } from "../types/Post";

export const PostsByUsernameQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getPostsByUsername", {
      type: "PublicPost",
      args: {
        chosenUsername: nonNull(stringArg()),
      },
      resolve: async (_, { chosenUsername }, { prisma }: Context) => {
        const getUserId = await prisma.user.findUnique({
          where: {
            chosenUsername,
          },
          select: {
            id: true,
          },
        });

        if (!getUserId) return [];

        const posts = await prisma.post.findMany({
          where: {
            creator: {
              id: getUserId?.id,
            },
          },
          select: publicPostFields,
        });

        console.info("getPostsByUsername", chosenUsername, posts);

        return posts;
      },
    });
  },
});
