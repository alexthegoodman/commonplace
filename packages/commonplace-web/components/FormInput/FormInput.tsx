import * as React from "react";

import { FormInputProps } from "./FormInput.d";

const FormInput: React.FC<FormInputProps> = ({
  //   name = "",
  //   type = "text",
  validation = {},
  errors = null,
  register = null,
  ...fieldProps
}) => {
  return (
    <div className="formInput">
      <input {...fieldProps} {...register(fieldProps.name, validation)} />
      {errors !== null && errors[fieldProps.name] ? (
        <span>Email is required.</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormInput;
