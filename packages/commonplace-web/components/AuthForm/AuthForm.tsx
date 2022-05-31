import request from "graphql-request";
import { useRouter } from "next/router";
import * as React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { cpDomain, cpGraphqlUrl } from "../../def/urls";
const { DateTime } = require("luxon");

import { authenticateQuery, registerQuery } from "../../graphql/queries/user";
import FormInput from "../FormInput/FormInput";
import FormMessage from "../FormMessage/FormMessage";

import { AuthFormProps } from "./AuthForm.d";

const AuthForm: React.FC<AuthFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click AuthForm"),
  type = "sign-in",
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["coUserId"]);
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
      var userIdData, userId;

      if (type === "sign-in") {
        userIdData = await request(cpGraphqlUrl, authenticateQuery, {
          email: data.email,
          password: data.password,
        });
        userId = userIdData.authenticate;
      } else if (type === "sign-up") {
        userIdData = await request(cpGraphqlUrl, registerQuery, {
          email: data.email,
          password: data.password,
        });
        userId = userIdData.registerUser;
      }

      const expireCookie = DateTime.now()
        .plus({ weeks: 1 })
        .endOf("day")
        .toUTC()
        .toJSDate();

      console.info("userId", userId, expireCookie);

      setCookie("coUserId", userId, {
        sameSite: "strict",
        domain: cpDomain, // TODO: set by production or development
        expires: expireCookie,
        // secure: true // only accessible via https
      });

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

      <input className="circleButton" type="submit" value="GO" />
    </form>
  );
};

export default AuthForm;
