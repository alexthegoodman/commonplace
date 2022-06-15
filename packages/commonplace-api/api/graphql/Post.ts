import { PrismaClient, User } from "@prisma/client";
import { nanoid } from "nanoid";
import {
  extendType,
  intArg,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from "nexus";
import slugify from "slugify";

import Utilities from "../../../commonplace-utilities";

const prisma = new PrismaClient();

const publicPostFields = {
  id: true,
  title: true,
  description: true,
  generatedTitleSlug: true,
  contentType: true,
  contentPreview: true,
  content: true,
  interest: true,
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

    t.field("interest", { type: "Interest" });

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

export const CreatePostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createPost", {
      type: "Post",
      args: {
        creatorId: nonNull(stringArg()),
        interestId: nonNull(stringArg()),
        contentType: nonNull(stringArg()),
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),

        text: nullable(stringArg()),

        file1Name: nullable(stringArg()),
        file1Size: nullable(intArg()),
        file1Type: nullable(stringArg()),
        file1Data: nullable(stringArg()),

        file2Name: nullable(stringArg()),
        file2Size: nullable(intArg()),
        file2Type: nullable(stringArg()),
        file2Data: nullable(stringArg()),
      },
      resolve: async (
        _,
        {
          creatorId,
          interestId,
          contentType,
          title,
          description,
          text,
          file1Name,
          file1Size,
          file1Type,
          file1Data,
          file2Name,
          file2Size,
          file2Type,
          file2Data,
        },
        { prisma: PrismaClient }
      ) => {
        console.info(
          "Create Post",
          creatorId,
          interestId,
          contentType,
          title,
          description,
          text,
          file1Name,
          file1Size,
          file1Type,
          file2Name,
          file2Size,
          file2Type
        );

        const utilities = new Utilities();

        let upload1Path = "";
        if (file1Name && file1Data) {
          upload1Path = await utilities.AWS.uploadAsset(
            contentType,
            file1Name,
            file1Type,
            file1Size,
            file1Data
          );
        }

        let upload2Path = "";
        if (file2Name && file2Data) {
          upload2Path = await utilities.AWS.uploadAsset(
            "image", // file2 is always image
            file2Name,
            file2Type,
            file2Size,
            file2Data
          );
        }

        const generatedTitleSlug = slugify(title) + "-" + nanoid(10);

        console.info(
          "generatedTitleSlug",
          upload1Path,
          upload2Path,
          generatedTitleSlug
        );

        // if (!utilities.helpers.isDefinedWithContent(upload1Path)) {
        //   throw Error(utilities.ERROR_CODES.C010);
        // }

        let contentData = {
          contentPreview: upload2Path,
          content: upload1Path,
        };

        if (contentType === "text" && text) {
          contentData = {
            contentPreview: "",
            content: text,
          };
        }

        const post = await prisma.post.create({
          data: {
            title,
            description,
            generatedTitleSlug,
            contentType,
            ...contentData,
            interest: {
              connect: {
                id: interestId,
              },
            },
            creator: {
              connect: {
                id: creatorId,
              },
            },
          },
        });

        // deduct credits if interest allows

        const interest = await prisma.interest.findFirst({
          where: {
            id: interestId,
          },
          include: {
            posts: true,
          },
        });

        console.info(
          "create post, intersts",
          interestId,
          interest,
          interest?.posts?.length
        );

        // more than 5 posts in selected interst
        if (interest && interest?.posts?.length > 5) {
          const creator = await prisma.user.findFirst({
            where: {
              id: creatorId,
            },
          });

          const newCredit = (creator?.credit as number) - 3;
          await prisma.user.update({
            where: {
              id: creatorId,
            },
            data: {
              credit: newCredit,
            },
          });
        }

        console.info("Created post", post);

        return post;
      },
    });
  },
});

export const PostURLsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getPostURLs", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma: PrismaClient }) => {
        const slugs = await prisma.post.findMany({
          select: {
            generatedTitleSlug: true,
            interest: true,
          },
        });

        const urls = slugs.map((user, i) => {
          return (
            "/" +
            user.interest.generatedInterestSlug +
            "/" +
            user.generatedTitleSlug
          );
        });

        console.info("getPostURLs", slugs, urls);

        return urls;
      },
    });
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
