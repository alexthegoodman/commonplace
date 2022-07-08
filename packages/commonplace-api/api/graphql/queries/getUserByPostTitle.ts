import { extendType, intArg, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";
import { publicUserFields } from "../types/User";

export const UserByPostTitleQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getUserByPostTitle", {
      type: "PublicUser",
      args: {
        postTitle: nonNull(stringArg()),
      },
      resolve: async (_, { postTitle }, { prisma }: Context) => {
        const getPostByTitle = await prisma.post.findFirst({
          where: {
            generatedTitleSlug: postTitle,
          },
          select: {
            id: true,
          },
        });

        console.info("getPostByTitle", getPostByTitle);

        const user = await prisma.user.findFirst({
          where: {
            posts: {
              some: {
                id: getPostByTitle?.id,
              },
            },
          },
          select: publicUserFields,
        });

        console.info("getUserByPostTitle", postTitle, user);

        return user;
      },
    });
  },
});
