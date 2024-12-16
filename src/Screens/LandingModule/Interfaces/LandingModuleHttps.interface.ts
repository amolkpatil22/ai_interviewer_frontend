import { getAllCategoriesHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/getAllCategories.interfce";

export interface getAllCategoriesResponse {
  status: boolean;
  message: string;
  data?: getAllCategoriesHttpsData[];
}
