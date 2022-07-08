import { objectType } from "nexus";

export const publicUserFields = {
  name: true,
  generatedUsername: true,
  chosenUsername: true,
  profileImage: true,
  coverImage: true,
};

export const PublicUserType = objectType({
  name: "PublicUser",
  definition(t) {
    t.field("name", { type: "String" });
    t.field("generatedUsername", { type: "String" });
    t.field("chosenUsername", { type: "String" });

    t.field("profileImage", { type: "String" });
    t.field("coverImage", { type: "String" });
  },
});

export const UserType = objectType({
  name: "User",
  definition(t) {
    t.model.name();
    t.model.generatedUsername();
    t.model.chosenUsername();

    t.model.profileImage();
    t.model.coverImage();

    t.model.posts({
      filtering: false,
      ordering: false,
      pagination: false,
    });

    t.model.updatedAt();
    t.model.createdAt();

    // ** Protected **//
    // t.string("id"); // do not expose
    t.model.email();
    t.model.credit();
    t.model.threads({ ordering: true, filtering: true });
    // t.model.messages();
    // t.model.readMessages();
  },
});
