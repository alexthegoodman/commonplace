import request from "graphql-request";
import { useRouter } from "next/router";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { cpDomain, cpGraphqlUrl } from "../../../def/urls";
const { DateTime } = require("luxon");
// import LogRocket from "logrocket";

import { authenticateQuery } from "../../../graphql/queries/user";
import FormInput from "../../fields/FormInput/FormInput";
import FormMessage from "../../fields/FormMessage/FormMessage";

import { AuthFormProps } from "./AuthForm.d";
import Utilities from "commonplace-utilities/lib";
import { registerMutation } from "../../../graphql/mutations/user";
import { CookieSettings } from "../../../pages/settings";
import { useTranslation } from "next-i18next";
import MixpanelBrowser from "../../../helpers/MixpanelBrowser";

const AuthForm: React.FC<AuthFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click AuthForm"),
  type = "sign-in",
  defaultLng = "en",
}) => {
  const { t } = useTranslation();
  const utilities = new Utilities();
  const mixpanel = new MixpanelBrowser();

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);
  const [formErrorMessage, setFormErrorMessage] = React.useState("");
  const [submitLoading, setSubmitLoading] = React.useState(false);

  console.info("cookies", cookies);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit", data);

    setSubmitLoading(true);

    try {
      var userIdData, token;

      const authorizationHeader = utilities.helpers.createAuthHeader(
        `${data.email}:${data.password}`
      );

      if (type === "sign-in") {
        mixpanel.track("Sign In - Attempt", { email: data.email });

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
        mixpanel.track("Sign Up - Attempt", { email: data.email });

        userIdData = await request(
          cpGraphqlUrl,
          registerMutation,
          {},
          {
            Authorization: authorizationHeader,
          }
        );

        token = userIdData.registerUser;

        // if (typeof fbq !== "undefined") {
        //   console.info("trackCustom SignUp");
        //   fbq("trackCustom", "SignUp", {});
        // }

        const ReactPixel = require("react-facebook-pixel");
        ReactPixel.default.trackCustom("SignUp", {});
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
      setSubmitLoading(false);
    }
  };

  const onError = (error) => console.error(error);

  let submitButtonText =
    type === "sign-in"
      ? t("auth:signIn", { defaultLng })
      : t("auth:signUp", { defaultLng });

  if (submitLoading) submitButtonText = t("common:loading", { defaultLng });

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormMessage type="error" message={formErrorMessage} />

      <FormInput
        type="email"
        name="email"
        placeholder={t("auth:email", { defaultLng })}
        register={register}
        errors={errors}
        validation={{
          required: t("auth:errors.emailRequired", { defaultLng }),
        }}
      />

      <FormInput
        type="password"
        name="password"
        placeholder={t("auth:password", { defaultLng })}
        register={register}
        errors={errors}
        validation={{
          required: t("auth:errors.passwordRequired", { defaultLng }),
        }}
      />

      <button className="circleButton" type="submit" disabled={submitLoading}>
        {submitButtonText}
      </button>
    </form>
  );
};

export default AuthForm;
