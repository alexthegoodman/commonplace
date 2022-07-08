import { objectType } from "nexus";

export const ThreadType = objectType({
  name: "Thread",
  definition(t) {
    t.model.id();
    t.model.repliesAllowed();

    // t.model.post();
    t.model.users();
    t.model.messages({
      ordering: true,
    });
    t.model.readHistory({
      ordering: true,
    });

    t.model.updatedAt();
    t.model.createdAt();
  },
});
