import { useForm } from "react-hook-form";
import { SignUpFormValues } from "../interfaces/SignUpModule.interface";
import { useNavigate } from "react-router-dom";

export const useSignUpModule = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const onSubmit = handleSubmit((data) => console.log());

  return {
    navigate,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
