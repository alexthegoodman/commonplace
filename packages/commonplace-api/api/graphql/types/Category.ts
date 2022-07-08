import { objectType } from "nexus";

export const CategoryType = objectType({
  name: "Category",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.interests();
  },
});
