import { shield, allow, deny, rule, and, or, not } from "graphql-shield";

const isAdmin = rule()(async (parent, args, ctx, info) => {
  const allowed = ctx.currentUser.role === "ADMIN";
  return allowed;
});

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const allowed =
    ctx.currentUser !== null && typeof ctx.currentUser !== "undefined";
  console.info("isAuthenticated", allowed);
  return allowed;
});

export const permissions = shield({
  Query: {
    // "*": deny,
    authenticate: not(isAuthenticated),
    // fruits: and(isAuthenticated, or(isAdmin, isEditor)),
    getUser: and(isAuthenticated, isAdmin),
  },
  Mutation: {
    // "*": deny,
    createMessage: isAuthenticated,
  },
  //   Fruit: isAuthenticated,
  //   Customer: isAdmin,
});
