import { ChangeEvent } from "react";
import { UserProps } from "./user";

export interface FormFieldsProps {
  formData: Partial<Omit<UserProps, "id" | "manager">>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
