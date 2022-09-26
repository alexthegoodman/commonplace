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
// import LogRocket from "logrocket";

import { authenticateQuery } from "../../../graphql/queries/user";
import FormInput from "../../fields/FormInput/FormInput";
import FormMessage from "../../fields/FormMessage/FormMessage";

import { AuthFormProps } from "./AuthForm.d";
import Utilities from "../../../../commonplace-utilities";
import { registerMutation } from "../../../graphql/mutations/user";
import { CookieSettings } from "../../../pages/settings";

const AuthForm: React.FC<AuthFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click AuthForm"),
  type = "sign-in",
  submitText = "",
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
          registerMutation,
          {},
          {
            Authorization: authorizationHeader,
          }
        );

        token = userIdData.registerUser;

        if (typeof fbq !== "undefined") {
          console.info("trackCustom SignUp");
          fbq("trackCustom", "SignUp", {});
        }
      }

      const expireCookie = DateTime.now()
        .plus({ weeks: 1 })
        .endOf("day")
        .toUTC()
        .toJSDate();

      console.info(
        "token",
        token,
        cpDomain,
        expireCookie,
        process.env.NODE_ENV,
        process.env.NEXT_PUBLIC_APP_ENV
      );

      setCookie("coUserToken", token, {
        ...CookieSettings,
        expires: expireCookie,
      });

      console.info("cookie set with token");

      // try {
      //   LogRocket.identify(data.email);
      // } catch (error) {
      //   console.error("LogRocket error", error);
      // }

      console.info("redirect to queue");

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

  const submitButtonText =
    submitText !== "" ? submitText : type === "sign-in" ? "Sign In" : "Sign Up";

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

      <input className="circleButton" type="submit" value={submitButtonText} />
    </form>
  );
};

export default AuthForm;
