import axios from "axios";
import { submitCandidatesAnswerHttpsRequest } from "../../../Common/AxiosInterceptor/Interview/interfaces/submitCandidatesAnswer.interface";
import { submitCandidatesAnswerHttps } from "../../../Common/AxiosInterceptor/Interview/Interview.https";
import { SubmitCandidatesAnswerResponse } from "../interfaces/InterviewModuleHttps.interface";

export const submitCandidatesAnswer = async (
  payload: submitCandidatesAnswerHttpsRequest
): Promise<SubmitCandidatesAnswerResponse> => {
  try {
    const response = await submitCandidatesAnswerHttps(payload);
    return {
      status: true,
      data: response.data,
      message: "Success",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: false,
        message: error.response?.data.message,
      };
    } else {
      return {
        status: false,
        message: "Something went wrong, Please submit answer again",
      };
    }
  }
};
