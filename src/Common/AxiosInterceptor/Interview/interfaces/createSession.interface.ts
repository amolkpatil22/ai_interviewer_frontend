import { Question } from "../../../../Redux/QuestionsSlice/QuestionsSlice";

export interface CreateSessionHttpsRequest {
  category_id: string;
  sub_category_id: string;
  difficulty: string;
  tech: string;
}

export interface CreateSessionsHttpsSessionData {
  _id: string;
  user_id: string;
  category_id: string;
  sub_category_id: string;
  difficulty: string;
  start_at: Date;
  end_at: Date | null;
}

export interface CreateSessionHttpsData {
  sessionData: CreateSessionHttpsData;
  questions: Question[];
}

export interface CreateSessionHttpsResponse {
  header: Object;
  data: CreateSessionHttpsData;
}
