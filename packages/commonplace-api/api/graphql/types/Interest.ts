import { objectType } from "nexus";
import { Context } from "../../context";

export const InterestType = objectType({
  name: "Interest",
  definition(t) {
    t.field("id", {
      type: "String",
    });

    t.field("name", {
      type: "String",
    });

    t.field("generatedInterestSlug", {
      type: "String",
    });

    t.list.field("categories", {
      type: "Category",
      resolve: async (interest, __, context: Context) => {
        return await context.prisma.category.findMany({
          where: {
            interests: {
              some: {
                id: interest.id,
              },
            },
          },
        });
      },
    });

    t.list.field("posts", {
      type: "Post",
      resolve: async (interest, __, context: Context) => {
        return await context.prisma.post.findMany({
          where: {
            interest: {
              id: interest.id,
            },
          },
        });
      },
    });
  },
});
