import { extendType } from "nexus";

export const PostQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("authenticate", {
      type: "String",
      resolve: () => {
        return "safe";
      },
    });
  },
});
