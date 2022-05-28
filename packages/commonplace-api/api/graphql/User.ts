import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import bcrypt from "bcryptjs";
import Utilities from "../../../commonplace-utilities";

const prisma = new PrismaClient();

const publicUserFields = {
  name: true,
  generatedUsername: true,
  chosenUsername: true,
  profileImage: true,
  coverImage: true,
};

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

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("user", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, { prisma: PrismaClient }) => {
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });

        console.info("Get user", id, user);

        return user;
      },
    });
  },
});

export const UserByUsernameQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getUserByUsername", {
      type: "User",
      args: {
        chosenUsername: nonNull(stringArg()),
      },
      resolve: async (_, { chosenUsername }, { prisma: PrismaClient }) => {
        const user = await prisma.user.findFirst({
          where: {
            chosenUsername,
          },
          select: publicUserFields,
        });

        console.info("getUserByUsername", chosenUsername, user);

        return user;
      },
    });
  },
});

export const UserByPostTitleQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getUserByPostTitle", {
      type: "User",
      args: {
        postTitle: nonNull(stringArg()),
      },
      resolve: async (_, { postTitle }, { prisma: PrismaClient }) => {
        const getPostByTitle = await prisma.post.findFirst({
          where: {
            generatedTitleSlug: postTitle,
          },
          select: {
            id: true,
          },
        });

        console.info("getPostByTitle", getPostByTitle);

        const user = await prisma.user.findFirst({
          where: {
            posts: {
              some: {
                id: getPostByTitle?.id,
              },
            },
          },
          select: publicUserFields,
        });

        console.info("getUserByPostTitle", postTitle, user);

        return user;
      },
    });
  },
});

export const AuthenticateQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("authenticate", {
      type: "String",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }) => {
        const utilities = new Utilities();

        const user: User = await new Promise(async (resolve, reject) => {
          utilities.logs.write(["Authentication Request ", email]);

          // find user match by email
          let user;
          try {
            user = await prisma.user.findUnique({
              where: { email },
            });
          } catch (error) {
            reject(error);
          }

          // if user is found, check for password match
          if (utilities.helpers.isDefinedWithContent(user)) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
              utilities.logs.write("Authentication Credentials Valid");

              resolve(user);
            } else {
              utilities.logs.write(utilities.ERROR_CODES.B003, "error");
              reject(utilities.ERROR_CODES.B003);
            }
          } else {
            utilities.logs.write(utilities.ERROR_CODES.C001, "error");
            reject(utilities.ERROR_CODES.C001);
          }
        });

        utilities.logs.write(["Authenticate user", user]);

        // TODO: encrypt with JWT
        // TODO: set secure cookie tied to origin

        return user.id;
      },
    });
  },
});

export const RegisterUserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("registerUser", {
      type: "String",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }) => {
        const utilities = new Utilities();

        const user: User = await new Promise(async (resolve, reject) => {
          utilities.logs.write(["Register User Incoming Request ", email]);

          bcrypt.hash(password, 12, async (err, hash) => {
            if (utilities.helpers.isDefinedWithContent(hash)) {
              const generatedUsername =
                utilities.helpers.emailToUsername(email);

              let newUser;
              try {
                newUser = await prisma.user.create({
                  data: {
                    email,
                    password: hash,
                    generatedUsername,
                    chosenUsername: generatedUsername,
                  },
                });
              } catch (error) {
                reject(utilities.ERROR_CODES.C008);
              }

              // TODO: mandrill
              // TODO: mailchimp list
              // TODO: mixpanel

              resolve(newUser);
            } else {
              reject(utilities.ERROR_CODES.C005);
            }
          });
        });

        utilities.logs.write(["Register user", user]);

        // TODO: encrypt with JWT
        // TODO: set secure cookie tied to origin

        return user.id;
      },
    });
  },
});
