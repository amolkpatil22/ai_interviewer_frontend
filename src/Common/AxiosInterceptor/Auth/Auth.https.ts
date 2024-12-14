import axiosInstance from "../AxiosInstance";
import { UserLoginHttpRequest, UserLoginHttpResponse } from "./Interfaces/Auth.interface";

export const userLoginHttp = async (payload: UserLoginHttpRequest): Promise<UserLoginHttpResponse> =>
  await axiosInstance.post("/auth/login", payload);
