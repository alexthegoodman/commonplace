import request from "graphql-request";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
const { DateTime } = require("luxon");

import { authenticateQuery } from "../../graphql/queries/user";
import FormInput from "../FormInput/FormInput";

import { SignInFormProps } from "./SignInForm.d";
import FormMessage from "../FormMessage/FormMessage";
import { useRouter } from "next/router";

const SignInForm: React.FC<SignInFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click SignInForm"),
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
      const userIdData = await request(
        "http://localhost:4000/graphql",
        authenticateQuery,
        {
          email: data.email,
          password: data.password,
        }
      );

      const userId = userIdData.authenticate;
      const expireCookie = DateTime.now()
        .plus({ weeks: 1 })
        .endOf("day")
        .toUTC()
        .toJSDate();

      console.info("userId", userId, expireCookie);

      setCookie("coUserId", userId, {
        sameSite: "strict",
        domain: "localhost", // TODO: set by production or development
        expires: expireCookie,
        // secure: true // only accessible via https
      });

      // cleanup and
      setFormErrorMessage("");
      router.push("/queue");
    } catch (error) {
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

export default SignInForm;
