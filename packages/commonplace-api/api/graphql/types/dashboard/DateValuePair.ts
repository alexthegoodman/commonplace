import { objectType } from "nexus";

export const DateValuePair = objectType({
  name: "DateValuePair",
  definition(t) {
    t.field("date", {
      type: "String",
    });
    t.field("value", {
      type: "String",
    });
  },
});
