import { ValidationMap } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface FormUploadProps {
  name: string;
  type?: string;
  placeholder?: string;
  errors?: FieldErrors;
  validation?: ValidationMap;
  register: UseFormRegister;
}
