import * as React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";

import { SignInFormProps } from "./SignInForm.d";

const SignInForm: React.FC<SignInFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click SignInForm"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const onError = (error) => console.error(error);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        register={register}
        errors={errors}
        validation={{ required: true }}
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Password"
        register={register}
        errors={errors}
        validation={{ required: true }}
      />

      <input className="circleButton" type="submit" value="GO" />
    </form>
  );
};

export default SignInForm;
