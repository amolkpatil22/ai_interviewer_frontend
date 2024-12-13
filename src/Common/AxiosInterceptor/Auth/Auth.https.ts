import axiosInstance from "../AxiosInstance";
import { UserLoginData, UserLoginHttpRequest, UserLoginHttpResponse } from "./Interfaces/Auth.interface";

export const userLoginHttp = async (payload: UserLoginHttpRequest): Promise<UserLoginHttpResponse> =>
  await axiosInstance.post("/auth/login", payload);
