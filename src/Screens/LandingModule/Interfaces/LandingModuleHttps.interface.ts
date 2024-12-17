import { CreateSessionHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/createSession.interface";
import { getAllCategoriesHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/getAllCategories.interfce";
import { getSubCategoriesByCategoryIdHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/getSubCategoriesByCategoryId.interface";

export interface getAllCategoriesResponse {
  status: boolean;
  message: string;
  data?: getAllCategoriesHttpsData[];
}

export interface getSubCategoryResponse {
  status: boolean;
  message: string;
  data?: getSubCategoriesByCategoryIdHttpsData[];
}

export interface createSessionResponse {
  status: boolean;
  message: string;
  data?: CreateSessionHttpsData;
}
