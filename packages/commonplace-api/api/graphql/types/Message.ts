import { objectType } from "nexus";

export const MessageType = objectType({
  name: "Message",
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.content();

    t.model.user();
    t.model.post();
    // t.model.thread();

    // t.model.readBy();

    t.model.updatedAt();
    t.model.createdAt();
  },
});
