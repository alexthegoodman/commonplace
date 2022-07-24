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
                id: post.id,
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
                id: post.id,
              },
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
