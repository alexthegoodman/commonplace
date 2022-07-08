import { objectType } from "nexus";

export const publicPostFields = {
  id: true,
  title: true,
  description: true,
  generatedTitleSlug: true,
  contentType: true,
  contentPreview: true,
  content: true,
  interest: true,
  updatedAt: true,
  createdAt: true,
};

export const PublicPostType = objectType({
  name: "PublicPost",
  definition(t) {
    t.field("id", { type: "String" });
    t.field("title", { type: "String" });
    t.field("description", { type: "String" });

    t.field("generatedTitleSlug", { type: "String" });

    t.field("contentType", { type: "String" });
    t.field("contentPreview", { type: "String" });
    t.field("content", { type: "String" });

    t.field("interest", { type: "Interest" });

    t.field("updatedAt", { type: "DateTime" });
    t.field("createdAt", { type: "DateTime" });
  },
});

export const PostType = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();

    t.model.generatedTitleSlug();

    t.model.contentType();
    t.model.contentPreview();
    t.model.content();

    t.model.interest();
    // t.model.modifiers();

    t.model.creator();
    // t.model.threads();

    t.model.updatedAt();
    t.model.createdAt();
  },
});
