import axios from "axios";
import { getInterviewFeedbackHttps } from "../../../Common/AxiosInterceptor/Interview/Interview.https";
import { getInterviewFeedbackResponse } from "../interfaces/AnalysisModuleHttp.interface";

export const getInterviewFeedback = async (session_id: string): Promise<getInterviewFeedbackResponse> => {
  try {
    const response = await getInterviewFeedbackHttps(session_id);
    return { status: true, message: "Success", data: response.data };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: false,
        message: error.response?.data.message,
      };
    }
    return { status: false, message: "Unable to get report, Please try again" };
  }
};
