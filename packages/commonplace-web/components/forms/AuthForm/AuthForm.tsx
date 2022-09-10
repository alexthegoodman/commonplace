import request from "graphql-request";
import { useRouter } from "next/router";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import mixpanel from "mixpanel-browser";
import {
  cpDomain,
  cpGraphqlUrl,
} from "../../../../commonplace-utilities/def/urls";
const { DateTime } = require("luxon");
import LogRocket from "logrocket";

import {
  authenticateQuery,
  registerQuery,
} from "../../../graphql/queries/user";
import FormInput from "../../fields/FormInput/FormInput";
import FormMessage from "../../fields/FormMessage/FormMessage";

import { AuthFormProps } from "./AuthForm.d";
import Utilities from "../../../../commonplace-utilities";

const AuthForm: React.FC<AuthFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click AuthForm"),
  type = "sign-in",
}) => {
  const utilities = new Utilities();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);
  const [formErrorMessage, setFormErrorMessage] = React.useState("");

  console.info("cookies", cookies);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit", data);

    try {
      var userIdData, token;

      const authorizationHeader = utilities.helpers.createAuthHeader(
        `${data.email}:${data.password}`
      );

      if (type === "sign-in") {
        mixpanel.track("Sign In - Attempt");

        userIdData = await request(
          cpGraphqlUrl,
          authenticateQuery,
          {},
          {
            Authorization: authorizationHeader,
          }
        );

        token = userIdData.authenticate;
      } else if (type === "sign-up") {
        mixpanel.track("Sign Up - Attempt");

        userIdData = await request(
          cpGraphqlUrl,
          registerQuery,
          {},
          {
            Authorization: authorizationHeader,
          }
        );

        token = userIdData.registerUser;
      }

      const expireCookie = DateTime.now()
        .plus({ weeks: 1 })
        .endOf("day")
        .toUTC()
        .toJSDate();

      console.info("token", token, expireCookie);

      setCookie("coUserToken", token, {
        sameSite: "strict",
        domain: cpDomain,
        expires: expireCookie,
        // secure: true // only accessible via https
      });

      try {
        LogRocket.identify(data.email);
      } catch (error) {
        console.error("LogRocket error", error);
      }

      // cleanup and
      setFormErrorMessage("");
      router.push("/queue");
    } catch (error: any) {
      console.error(error);
      const errorMessage = error?.response?.errors[0].message;
      setFormErrorMessage(errorMessage);
    }
  };

  const onError = (error) => console.error(error);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormMessage type="error" message={formErrorMessage} />

      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        register={register}
        errors={errors}
        validation={{ required: "Email is required." }}
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        register={register}
        errors={errors}
        validation={{ required: "Password is required." }}
      />

      <input
        className="circleButton"
        type="submit"
        value={type === "sign-in" ? "Sign In" : "Sign Up"}
      />
    </form>
  );
};

export default AuthForm;
