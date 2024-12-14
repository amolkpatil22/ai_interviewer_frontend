import { useForm } from "react-hook-form";
import { FormValues } from "../interfaces/LoginModule.interface";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../https/UserLogin.http";
import { useDispatch } from "react-redux";
import { saveUser } from "../../../Redux/UserSlice/UserSlice";
import { showAlert } from "../../../Redux/AlertSlice/AlertSlice";
import { useState } from "react";
import { createToaster } from "@chakra-ui/react";
import { toaster } from "../../../Components/ui/toaster";
import { LocalStorageKeys, setItemToLocalStorage } from "../../../Common/Utils/ManageLocalStorage";

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
      dispatch(saveUser(response.data));
      setItemToLocalStorage(LocalStorageKeys.isLoggedIn, true);
      toaster.create({
        type: "success",
        title: "Login Success",
        description: "User Logged in Successfully",
        duration: 3000,
      });
      navigate("/");
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
