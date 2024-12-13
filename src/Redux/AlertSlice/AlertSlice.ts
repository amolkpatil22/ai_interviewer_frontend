// src/redux/slices/alertSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertState {
  isVisible: boolean;
  title: string;
  description: string;
  type: "success" | "error" | "info" | "warning"; // You can add more types if needed
}

const initialState: AlertState = {
  isVisible: false,
  title: "",
  description: "",
  type: "info", // Default type
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (
      state,
      action: PayloadAction<{ description: string; title: string; type: "success" | "error" | "info" | "warning" }>
    ) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.type = action.payload.type;
      state.isVisible = true;
    },
    hideAlert: (state) => {
      state.isVisible = false;
      state.title = "";
      state.description = "";
      state.type = "info";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
