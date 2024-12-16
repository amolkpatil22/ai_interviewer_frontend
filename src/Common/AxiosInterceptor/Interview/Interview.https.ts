import axiosInstance from "../AxiosInstance";
import { getAllCategoriesHttpsResponse } from "./interfaces/getAllCategories.interfce";
import { getSubCategoriesByCategoryIdHttpsResponse } from "./interfaces/getSubCategoriesByCategoryId.interface";

export const getAllCategoriesHttps = async (): Promise<getAllCategoriesHttpsResponse> =>
  await axiosInstance.get("/interview/get-all-categories");

export const getSubCategoriesByCategoryIdHttps = async (
  category_id: string
): Promise<getSubCategoriesByCategoryIdHttpsResponse> =>
  await axiosInstance.get(`/interview/get-sub-categories-by-category-id/${category_id}'`);
