import axios, { Axios, AxiosError } from "axios";
import { userLoginHttp } from "../../../Common/AxiosInterceptor/Auth/Auth.https";
import { UserLoginResponse } from "../interfaces/LoginHttp.interface";

export const userLogin = async (email: string, password: string): Promise<UserLoginResponse> => {
  try {
    const response = await userLoginHttp({ email, password });
    return { status: true, message: "User Logged In Successfully", data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: false,
        message: error?.response?.data?.message,
      };
    } else {
      return {
        status: false,
        message: "Something Went Wrong",
      };
    }
  }
};
