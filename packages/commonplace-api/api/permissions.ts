import { ApolloError } from "apollo-server";
import { shield, allow, deny, rule, and, or, not } from "graphql-shield";
import LogRocket from "logrocket";
LogRocket.init("binhki/commonplace-dev");

const isAdmin = rule()(async (parent, args, ctx, info) => {
  const allowed = ctx.currentUser.role === "ADMIN";
  return allowed;
});

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const allowed =
    ctx.currentUser !== null && typeof ctx.currentUser !== "undefined";
  return allowed;
});

export const permissions = shield(
  {
    Query: {
      "*": isAuthenticated,
      authenticate: not(isAuthenticated),
      getDashboardData: and(isAuthenticated, isAdmin),
      getDashboardPosts: and(isAuthenticated, isAdmin),
      getDashboardUsers: and(isAuthenticated, isAdmin),
      getPostsByUsername: allow,
      getUserByUsername: allow,
      getPostImpressions: allow,
      getUserByPostTitle: allow,
      getPostByPostTitle: allow,
      getProfileURLs: allow,
      getPostURLs: allow,
    },
    Mutation: {
      "*": isAuthenticated,
      registerUser: not(isAuthenticated),
      deletePostAdmin: and(isAuthenticated, isAdmin),
      deleteUserAdmin: and(isAuthenticated, isAdmin),
      createPageView: allow,
    },
    //   Fruit: isAuthenticated,
    //   Customer: isAdmin,
  },
  {
    fallbackError: async (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        return thrownThing;
      } else if (thrownThing instanceof Error) {
        console.error(thrownThing);
        LogRocket.captureException(thrownThing);
        return new ApolloError(thrownThing.message, "ERR_INTERNAL_SERVER");
      } else {
        console.error("The resolver threw something that is not an error.");
        console.error(thrownThing);
        return new ApolloError("Not Authorized!", "ERR_INTERNAL_SERVER");
      }
    },
  }
);
