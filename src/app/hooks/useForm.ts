import { useState, ChangeEvent } from "react";
import { UserProps } from "../interfaces/user";

type FormValues = Omit<UserProps, "id" | "manager">;

const useForm = (initialValues: FormValues) => {
  const [formData, setFormData] = useState<FormValues>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return {
    formData,
    handleChange,
  };
};

export default useForm;
