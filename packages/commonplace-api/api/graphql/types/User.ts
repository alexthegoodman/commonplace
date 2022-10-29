import { objectType } from "nexus";
import { Context } from "../../context";

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

    t.field("language", { type: "String" });
  },
});

export const UserType = objectType({
  name: "User",
  definition(t) {
    t.field("name", { type: "String" });
    t.field("generatedUsername", { type: "String" });
    t.field("chosenUsername", { type: "String" });

    t.field("profileImage", { type: "String" });
    t.field("coverImage", { type: "String" });

    t.field("language", { type: "String" });

    t.list.field("posts", {
      type: "Post",
      resolve: async (user, __, context: Context) => {
        return await context.prisma.post.findMany({
          where: {
            creator: {
              generatedUsername: user.generatedUsername as string,
            },
          },
        });
      },
    });

    t.field("updatedAt", {
      type: "DateTime",
    });

    t.field("createdAt", {
      type: "DateTime",
    });

    // // ** Protected **//
    t.field("email", { type: "String" });
    t.field("credit", { type: "Int" });
    // t.model.threads({ ordering: true, filtering: true });
    t.list.field("pageViews", {
      type: "PageView",
      resolve: async (user, __, context: Context) => {
        return await context.prisma.pageView.findMany({
          where: {
            user: {
              generatedUsername: user.generatedUsername as string,
            },
          },
        });
      },
    });
  },
});
