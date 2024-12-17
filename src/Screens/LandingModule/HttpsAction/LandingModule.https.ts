import axios from "axios";
import {
  createSessionHttps,
  getAllCategoriesHttps,
  getSubCategoriesByCategoryIdHttps,
} from "../../../Common/AxiosInterceptor/Interview/Interview.https";
import {
  createSessionResponse,
  getAllCategoriesResponse,
  getSubCategoryResponse,
} from "../Interfaces/LandingModuleHttps.interface";
import { CreateSessionHttpsRequest } from "../../../Common/AxiosInterceptor/Interview/interfaces/createSession.interface";

export const getAllCategories = async (): Promise<getAllCategoriesResponse> => {
  try {
    const response = await getAllCategoriesHttps();
    return {
      status: true,
      message: "Success",
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          status: false,
          message: "Data Not Available, Please Try After Sometime",
        };
      }
    }
    return {
      status: false,
      message: "Some Technical Problem, Please Try Again Later",
    };
  }
};

export const fetchSubCategory = async (category_id: string): Promise<getSubCategoryResponse> => {
  try {
    const response = await getSubCategoriesByCategoryIdHttps(category_id);
    return {
      status: true,
      message: "Success",
      data: response.data,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.status === 404) {
        return {
          status: false,
          message: "Data Not Available For This Category, Please Try Different Category",
        };
      }
    }
    return {
      status: false,
      message: "Some Technical Problem, Please Try Again Later",
    };
  }
};

export const createSession = async (payload: CreateSessionHttpsRequest): Promise<createSessionResponse> => {
  try {
    const response = await createSessionHttps(payload);
    return { status: true, message: "Session Created Successfully", data: response.data };
  } catch (error: unknown) {
    return {
      status: false,
      message: "Some Technical Problem, Please Try Again Later",
    };
  }
};
