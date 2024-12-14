import { useForm } from "react-hook-form";
import { SignUpFormValues } from "../interfaces/SignUpModule.interface";
import { useNavigate } from "react-router-dom";
import { createUser } from "../https/SignUpModule.https";
import { toaster } from "../../../Components/ui/toaster";

export const useSignUpModule = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const onSubmit = handleSubmit(async (data) => {
    const response = await createUser({ email: data.email, name: data.name, password: data.password });
    if (response.status) {
      toaster.create({
        type: "success",
        title: "User Created",
        description: "User created successfully",
      });
      navigate("/login");
    } else {
      toaster.create({
        type: "error",
        title: "User Creation Failed",
        description: response.message,
      });
    }
  });

  return {
    navigate,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};
