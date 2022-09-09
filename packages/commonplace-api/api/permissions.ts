import { ApolloError } from "apollo-server";
import { shield, allow, deny, rule, and, or, not } from "graphql-shield";

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
        // TODO: await Sentry.report(thrownThing)
        return new ApolloError("Internal server error", "ERR_INTERNAL_SERVER");
      } else {
        console.error("The resolver threw something that is not an error.");
        console.error(thrownThing);
        return new ApolloError("Not Authorized!", "ERR_INTERNAL_SERVER");
      }
    },
  }
);
