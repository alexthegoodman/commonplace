import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import Utilities from "../commonplace-utilities";
import { startApolloServer } from "./api";

const prisma = new PrismaClient();

const app = express();
const port = 3000;

console.info("Setup Express Routes...");

app.get("/", (req, res) => {
  res.send("API Functioning");
});

console.info("Setup Passport...");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // define the parameter in req.body that passport can use as username and password
      passwordField: "password",
    },
    async function (email: string, password: string, done) {
      const utilities = new Utilities();

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

          return done(null, user, {
            message: "Success! Valid Login Credentials",
          });
        } else {
          return done(null, false, { message: utilities.ERROR_CODES.B003 });
        }
      } else {
        return done(null, false, { message: utilities.ERROR_CODES.C001 });
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

console.info("Start Server...");

app.listen(port, () => {
  console.info(`Express Server ready on port ${port}`);
});

startApolloServer();
