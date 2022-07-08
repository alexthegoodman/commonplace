import { objectType } from "nexus";

export const RecordType = objectType({
  name: "Record",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.content();
    t.model.updatedAt();
    t.model.createdAt();
  },
});
