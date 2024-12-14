import axios from "axios";
import { createUserHttps } from "../../../Common/AxiosInterceptor/User/User.https";
import { CreateUser, CreateUserResponse } from "../interfaces/SignUpModule.interface";

export const createUser = async (payload: CreateUser): Promise<CreateUserResponse> => {
  try {
    const response = await createUserHttps(payload);
    return { status: true, message: "User Created Successfully", data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.status === 409) {
        return {
          status: false,
          message: "Email already exists",
        };
      }
      return {
        status: false,
        message: error.response?.data.message,
      };
    } else {
      return {
        status: false,
        message: "Something Went Wrong, Please Try Again Later",
      };
    }
  }
};
