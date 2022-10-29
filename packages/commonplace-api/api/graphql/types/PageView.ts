import { objectType } from "nexus";

export const PageViewType = objectType({
  name: "PageView",
  definition(t) {
    t.field("url", {
      type: "String",
    });

    t.field("ipAddress", {
      type: "String",
    });

    t.field("city", {
      type: "DateTime",
    });

    t.field("geoData", {
      type: "DateTime",
    });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});
