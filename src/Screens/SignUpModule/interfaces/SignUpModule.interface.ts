import { CreateUserHttpsData } from "../../../Common/AxiosInterceptor/User/Interfaces/User.interface";

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
}

export interface CreateUser {
  email: string;
  name: string;
  password: string;
  ip?: string;
}

export interface CreateUserResponse {
  status: boolean;
  message: string;
  data?: CreateUserHttpsData;
}
