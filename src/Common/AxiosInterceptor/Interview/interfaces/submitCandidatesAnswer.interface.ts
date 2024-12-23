export interface submitCandidatesAnswerHttpsRequest {
  session_id: string;
  payload: { question_id: string; candidate_answer: string };
}

export interface submitCandidatesAnswerHttpsData {
  _id: string;
}

export interface submitCandidatesAnswerHttpsResponse {
  headers: object;
  data: submitCandidatesAnswerHttpsData;
}
