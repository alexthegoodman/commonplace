import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";

const prisma = new PrismaClient();

const publicPostFields = {
  id: true,
  title: true,
  description: true,
  generatedTitleSlug: true,
  contentType: true,
  contentPreview: true,
  content: true,
  updatedAt: true,
  createdAt: true,
};

export const PublicPostType = objectType({
  name: "PublicPost",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("description", { type: "String" });

    t.field("generatedTitleSlug", { type: "String" });

    t.field("contentType", { type: "String" });
    t.field("contentPreview", { type: "String" });
    t.field("content", { type: "String" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();

    t.model.generatedTitleSlug();

    t.model.contentType();
    t.model.contentPreview();
    t.model.content();

    t.model.interest();
    // t.model.modifiers();

    t.model.creator();
    // t.model.threads();

    t.model.updatedAt();
    t.model.createdAt();
  },
});

export const PostByPostTitleQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getPostByPostTitle", {
      type: "PublicPost",
      args: {
        postTitle: nonNull(stringArg()),
      },
      resolve: async (_, { postTitle }, { prisma: PrismaClient }) => {
        const post = await prisma.post.findFirst({
          where: {
            generatedTitleSlug: postTitle,
          },
          select: publicPostFields,
        });

        console.info("getPostsByPostTitle", postTitle, post);

        return post;
      },
    });
  },
});

export const PostsByUsernameQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getPostsByUsername", {
      type: "PublicPost",
      args: {
        chosenUsername: nonNull(stringArg()),
      },
      resolve: async (_, { chosenUsername }, { prisma: PrismaClient }) => {
        const getUserId = await prisma.user.findUnique({
          where: {
            chosenUsername,
          },
          select: {
            id: true,
          },
        });

        // console.info("getUserId", getUserId);

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
