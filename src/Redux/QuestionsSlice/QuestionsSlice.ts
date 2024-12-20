import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum QuestionTypes {
  CODING = "coding",
  OUTPUT = "output",
  THEORY = "theory",
}

export interface Question {
  _id: string;
  category_id: string;
  sub_category_id: string;
  question: string;
  difficulty: string;
  type: QuestionTypes;
  hint: string;
}

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Question>) {
      state.questions.push(action.payload);
    },

    updateQuestion(state, action: PayloadAction<Question>) {
      const index = state.questions.findIndex((question) => question._id === action.payload._id);
      if (index !== -1) {
        state.questions[index] = action.payload;
      }
    },

    removeQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter((question) => question._id !== action.payload);
    },

    setQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
  },
});

export const { addQuestion, updateQuestion, removeQuestion, setQuestions } = questionsSlice.actions;

export default questionsSlice.reducer;
