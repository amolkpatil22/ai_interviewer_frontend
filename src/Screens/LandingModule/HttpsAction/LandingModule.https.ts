import axios from "axios";
import { getAllCategoriesHttps } from "../../../Common/AxiosInterceptor/Interview/Interview.https";
import { getAllCategoriesResponse } from "../Interfaces/LandingModuleHttps.interface";

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
      } else {
        return {
          status: false,
          message: "Some Technical Problem, Please Try Again Later",
        };
      }
    } else {
      return {
        status: false,
        message: "Some Technical Problem, Please Try Again Later",
      };
    }
  }
};
