import { objectType } from "nexus";
import { Context } from "../../context";

export const publicPostFields = {
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

const favoritedByCurrentUserResolver = async (post, __, context: Context) => {
  const favorite = await context.prisma.favorite.findFirst({
    where: {
      post: {
        id: post.id as string,
      },
      user: {
        id: context.currentUser.id,
      },
    },
  });
  const favorited = favorite && typeof favorite !== "undefined" ? true : false;
  return favorited;
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

    t.field("interest", {
      type: "Interest",
      resolve: async (post, __, context: Context) => {
        return await context.prisma.interest.findFirst({
          where: {
            posts: {
              some: {
                id: post.id as string,
              },
            },
          },
        });
      },
    });

    t.list.field("impressions", {
      type: "Message",
      resolve: async (post, __, context: Context) => {
        return await context.prisma.message.findMany({
          where: {
            post: {
              id: post.id as string,
            },
            type: {
              equals: "impression",
            },
          },
        });
      },
    });

    t.field("favoritedByCurrentUser", {
      type: "Boolean",
      resolve: favoritedByCurrentUserResolver,
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("description", { type: "String" });

    t.field("generatedTitleSlug", { type: "String" });

    t.field("contentType", { type: "String" });
    t.field("contentPreview", { type: "String" });
    t.field("content", { type: "String" });

    // t.model.interest();
    t.field("interest", {
      type: "Interest",
      resolve: async (post, __, context: Context) => {
        return await context.prisma.interest.findFirst({
          where: {
            posts: {
              some: {
                id: post.id as string,
              },
            },
          },
        });
      },
    });

    // t.model.creator();
    t.field("creator", {
      type: "PublicUser",
      resolve: async (post, __, context: Context) => {
        return await context.prisma.user.findFirst({
          where: {
            posts: {
              some: {
                id: post.id as string,
              },
            },
          },
        });
      },
    });

    t.list.field("impressions", {
      type: "Message",
      resolve: async (post, __, context: Context) => {
        return await context.prisma.message.findMany({
          where: {
            post: {
              id: post.id as string,
            },
            type: {
              equals: "impression",
            },
          },
        });
      },
    });

    t.field("favoritedByCurrentUser", {
      type: "Boolean",
      resolve: favoritedByCurrentUserResolver,
    });

    t.field("updatedAt", {
      type: "DateTime",
    });

    t.field("createdAt", {
      type: "DateTime",
    });
  },
});

export const ManagePostType = objectType({
  name: "ManagePost",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("description", { type: "String" });

    t.field("generatedTitleSlug", { type: "String" });

    t.field("contentType", { type: "String" });
    t.field("contentPreview", { type: "String" });
    t.field("content", { type: "String" });

    // t.model.interest();
    t.field("interest", {
      type: "Interest",
      resolve: async (post, __, context: Context) => {
        return await context.prisma.interest.findFirst({
          where: {
            posts: {
              some: {
                id: post.id as string,
              },
            },
          },
        });
      },
    });

    // t.model.creator();
    t.field("creator", {
      type: "User",
      resolve: async (post, __, context: Context) => {
        return await context.prisma.user.findFirst({
          where: {
            posts: {
              some: {
                id: post.id as string,
              },
            },
          },
        });
      },
    });

    t.list.field("messages", {
      type: "Message",
      resolve: async (post, __, context: Context) => {
        return await context.prisma.message.findMany({
          where: {
            post: {
              id: post.id as string,
            },
          },
        });
      },
    });

    t.field("updatedAt", {
      type: "DateTime",
    });

    t.field("createdAt", {
      type: "DateTime",
    });
  },
});
