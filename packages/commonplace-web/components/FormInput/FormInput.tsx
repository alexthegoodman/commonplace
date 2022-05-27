import * as React from "react";
import { ErrorMessage } from "@hookform/error-message";

import { FormInputProps } from "./FormInput.d";

const FormInput: React.FC<FormInputProps> = ({
  //   name = "",
  //   type = "text",
  validation = {},
  errors = null,
  register = null,
  ...fieldProps
}) => {
  console.info("input errors", errors);
  return (
    <div className="formInput">
      <input {...fieldProps} {...register(fieldProps.name, validation)} />
      {errors !== null && errors[fieldProps.name] ? (
        <ErrorMessage
          errors={errors}
          name={fieldProps.name}
          render={({ message }) => (
            <span className="formInputWarning">{message}</span>
          )}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormInput;
