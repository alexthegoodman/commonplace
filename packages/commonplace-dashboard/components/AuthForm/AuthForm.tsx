import Utilities from "commonplace-utilities";
import * as React from "react";

// TODO: set ESLint ignore for `next build` type check
import { AuthFormProps } from "./AuthForm.d";
import { useForm } from "react-hook-form";
import { cpGraphqlUrl } from "commonplace-utilities/def/urls";
import request from "graphql-request";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { authenticateQuery } from "../../gql/auth";
import FormInput from "../FormInput/FormInput";

const AuthForm: React.FC<AuthFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click AuthForm"),
}) => {
  const utilities = new Utilities();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["coUserToken"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit", data);

    try {
      const authorizationHeader = utilities.helpers.createAuthHeader(
        `${data.email}:${data.password}`
      );

      var userIdData = await request(
        cpGraphqlUrl,
        authenticateQuery,
        {},
        {
          Authorization: authorizationHeader,
        }
      );

      var token = userIdData.authenticate;

      console.info("successful sign in", token);

      setCookie("coUserToken", token);

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);
    }
  };

  const onError = (error) => console.error(error);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormInput
        type="email"
        name="email"
        placeholder={"Email"}
        register={register}
        errors={errors}
        validation={{
          required: "Required",
        }}
      />

      <FormInput
        type="password"
        name="password"
        placeholder={"Password"}
        register={register}
        errors={errors}
        validation={{
          required: "Required",
        }}
      />

      <input className="btn" type="submit" value={"Sign In"} />
    </form>
  );
};

export default AuthForm;
