import { PrismaClient, User } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import bcrypt from "bcryptjs";
import Utilities from "../../../commonplace-utilities";

const prisma = new PrismaClient();

export const UserType = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("email");
    t.string("name");
    // t.field("updatedAt");
    // t.string("createdAt");
  },
});

export const AuthenticateQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("authenticate", {
      type: "User",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_, { email, password }) => {
        const utilities = new Utilities();

        const user: User = await new Promise(async (resolve, reject) => {
          utilities.logs.write([
            "Passport Strategy Incoming Request ",
            email,
            password,
          ]);

          // find user match by email
          let user;
          try {
            user = await prisma.user.findUnique({
              where: { email },
            });
          } catch (error) {
            utilities.logs.write(["ERROR User Not Found: ", error], "error");
          }

          // if user is found, check for password match
          if (utilities.helpers.isDefinedWithContent(user)) {
            const match = await bcrypt.compare(password, user.password);

            if (match) {
              utilities.logs.write("Passport Strategy Credentials Valid");

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

        console.info("Query user", user);

        return user;
      },
    });
  },
});
