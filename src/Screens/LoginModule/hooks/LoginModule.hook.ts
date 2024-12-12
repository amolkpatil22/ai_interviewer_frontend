import { useForm } from "react-hook-form";
import { FormValues } from "../interfaces/LoginModule.interface";

export const useLoginModule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log());

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
