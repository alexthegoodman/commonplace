import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import bcrypt from "bcryptjs";
import Utilities from "../../../commonplace-utilities";

const prisma = new PrismaClient();

export const UserType = objectType({
  name: "User",
  definition(t) {
    // t.string("id"); // do not expose
    t.model.email();
    t.model.name();

    t.model.credit();
    t.model.profileImage();
    t.model.coverImage();

    t.model.posts();
    t.model.threads();
    // t.model.messages();
    // t.model.readMessages();

    t.model.updatedAt();
    t.model.createdAt();
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
              let newUser;
              try {
                newUser = await prisma.user.create({
                  data: {
                    email,
                    password: hash,
                  },
                });
              } catch (error) {
                reject(error);
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
