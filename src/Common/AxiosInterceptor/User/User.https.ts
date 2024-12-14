import axiosInstance from "../AxiosInstance";
import { CreateUserHttpsRequest, CreateUserHttpsResponse } from "./Interfaces/User.interface";

export const createUserHttps = async (payload: CreateUserHttpsRequest): Promise<CreateUserHttpsResponse> =>
  await axiosInstance.post("/user/create-user", payload);
