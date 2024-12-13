import { UserLoginData } from "../../../Common/AxiosInterceptor/Auth/Interfaces/Auth.interface";

export interface UserLoginResponse{
status:boolean,
message:string,
data?:UserLoginData
}