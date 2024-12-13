import { useForm } from "react-hook-form";
import { FormValues } from "../interfaces/LoginModule.interface";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../https/UserLogin.http";
import { useDispatch } from "react-redux";
import { saveUser } from "../../../Redux/UserSlice/UserSlice";
import { showAlert } from "../../../Redux/AlertSlice/AlertSlice";
import { useState } from "react";
import { toaster } from "../../../Components/ui/toaster";
import { createToaster } from "@chakra-ui/react";

export const useLoginModule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    setLoginLoading(true);
    const response = await userLogin(data.email, data.password);
    if (response.status && response.data) {
      console.log(response);
      dispatch(saveUser(response.data));
      toaster.create({
        type: "success",
        title: "Login Success",
        duration: 3000,
      });
    } else {
      toaster.create({
        type: "error",
        title: "Login Failed",
        description: response.message,
        duration: 3000,
      });
    }
    setLoginLoading(false);
  });

  return {
    loginLoading,
    navigate,
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};