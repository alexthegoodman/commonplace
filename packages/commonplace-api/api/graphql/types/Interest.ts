import { objectType } from "nexus";

export const InterestType = objectType({
  name: "Interest",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.generatedInterestSlug();
    t.model.categories();
    t.model.posts();
  },
});
