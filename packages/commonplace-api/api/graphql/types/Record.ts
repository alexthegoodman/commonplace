import { objectType } from "nexus";

export const RecordType = objectType({
  name: "Record",
  definition(t) {
    t.field("name", {
      type: "String",
    });

    t.field("content", {
      type: "String",
    });

    t.field("updatedAt", {
      type: "DateTime",
    });

    t.field("createdAt", {
      type: "DateTime",
    });
  },
});
