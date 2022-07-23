import { objectType } from "nexus";
import { Context } from "../../context";

export const CategoryType = objectType({
  name: "Category",
  definition(t) {
    t.field("name", {
      type: "String",
    });

    t.list.field("interests", {
      type: "Interest",
      resolve: async (category, __, context: Context) => {
        return await context.prisma.interest.findMany({
          where: {
            categories: {
              some: {
                id: category.id,
              },
            },
          },
        });
      },
    });
  },
});
