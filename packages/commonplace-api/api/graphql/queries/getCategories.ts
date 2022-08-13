import { extendType } from "nexus";
import { Context } from "../../context";

export const CategoriesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getCategories", {
      type: "Category",
      args: {},
      resolve: async (_, {}, { prisma }: Context) => {
        const categories = await prisma.category.findMany({
          where: {
            id: {
              contains: "",
            },
          },
        });

        return categories;
      },
    });
  },
});
