import * as React from "react";

import { SignUpFormProps } from "./SignUpForm.d";

const SignUpForm: React.FC<SignUpFormProps> = ({
  ref = null,
  className = "",
  onClick = (e) => console.info("Click SignUpForm"),
}) => {
  const clickHandler = (e: MouseEvent) => onClick(e);
  return <>SignUpForm</>;
};

export default SignUpForm;
