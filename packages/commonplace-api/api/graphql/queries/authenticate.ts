import { extendType, nonNull, stringArg } from "nexus";
import Utilities from "../../../../commonplace-utilities";

import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Context } from "../../context";

export const AuthenticateQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("authenticate", {
      type: "String",
      args: {},
      resolve: async (_, {}, { prisma, mixpanel, req }: Context, x) => {
        const utilities = new Utilities();

        const credentials = utilities.helpers.parseAuthHeader(
          req.headers.authorization
        );
        const email = credentials[0];
        const password = credentials[1];

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

        mixpanel.track("Sign In - Complete");

        return user.id;
      },
    });
  },
});
