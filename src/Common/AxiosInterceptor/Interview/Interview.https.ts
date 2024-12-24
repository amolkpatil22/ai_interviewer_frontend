import axiosInstance from "../AxiosInstance";
import { CreateSessionHttpsRequest, CreateSessionHttpsResponse } from "./interfaces/createSession.interface";
import { getAllCategoriesHttpsResponse } from "./interfaces/getAllCategories.interfce";
import { GetInterviewFeedbackHttpsResponse } from "./interfaces/getInterviewFeedback.interface";
import { getSubCategoriesByCategoryIdHttpsResponse } from "./interfaces/getSubCategoriesByCategoryId.interface";
import {
  submitCandidatesAnswerHttpsRequest,
  submitCandidatesAnswerHttpsResponse,
} from "./interfaces/submitCandidatesAnswer.interface";

export const getAllCategoriesHttps = async (): Promise<getAllCategoriesHttpsResponse> =>
  await axiosInstance.get("/interview/get-all-categories");

export const getSubCategoriesByCategoryIdHttps = async (
  category_id: string
): Promise<getSubCategoriesByCategoryIdHttpsResponse> =>
  await axiosInstance.get(`/interview/get-sub-categories-by-category-id/${category_id}`);

export const createSessionHttps = async (payload: CreateSessionHttpsRequest): Promise<CreateSessionHttpsResponse> =>
  await axiosInstance.post("/interview/create-session", payload);

export const submitCandidatesAnswerHttps = async ({
  payload,
  session_id,
}: submitCandidatesAnswerHttpsRequest): Promise<submitCandidatesAnswerHttpsResponse> =>
  await axiosInstance.post(`/interview/submit-answer/${session_id}`, payload);

export const getInterviewFeedbackHttps = async (session_id: string): Promise<GetInterviewFeedbackHttpsResponse> =>
  await axiosInstance.post(`/interview/get-report/${session_id}`);
