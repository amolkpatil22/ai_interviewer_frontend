import { submitCandidatesAnswerHttpsData } from "../../../Common/AxiosInterceptor/Interview/interfaces/submitCandidatesAnswer.interface";

export interface SubmitCandidatesAnswerResponse {
  status: boolean;
  message: string;
  data?: submitCandidatesAnswerHttpsData;
}
