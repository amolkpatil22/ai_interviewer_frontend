import { GetInterviewFeedbackHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/getInterviewFeedback.interface";

export interface getInterviewFeedbackResponse {
  status: boolean;
  data?: GetInterviewFeedbackHttpsData;
  message: string;
}
