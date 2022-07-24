import { objectType } from "nexus";

export const LabelValuePair = objectType({
  name: "LabelValuePair",
  definition(t) {
    t.field("label", {
      type: "String",
    });
    t.field("value", {
      type: "String",
    });
  },
});
