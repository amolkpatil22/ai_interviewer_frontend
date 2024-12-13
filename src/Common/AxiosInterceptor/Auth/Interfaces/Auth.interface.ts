import { HttpStatusCode } from "axios";

export interface UserLoginHttpRequest {
  email: string;
  password: string;
}

export interface UserLoginData {
  name: string;
  email: string;
  _id: string;
}

export interface UserLoginHttpResponse {
  headers: Object;
  data: UserLoginData;
}
