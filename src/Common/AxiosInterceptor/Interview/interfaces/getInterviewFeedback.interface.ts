export interface FeedbackObject {
  _id: string;
  answer_id: string;
  understanding_of_question: number;
  accuracy_of_answer: number;
  subject_knowledge: number;
  quality_of_answer: number;
  what_went_well: string;
  what_went_wrong: string;
  question: string;
  candidate_answer: string;
}

export interface GetInterviewFeedbackHttpsData {
  interview_data: InterviewData;
  feedback: FeedbackObject[];
}

interface InterviewData {
  tech: string;
}

export interface GetInterviewFeedbackHttpsResponse {
  headers: Object;
  data: GetInterviewFeedbackHttpsData;
}
