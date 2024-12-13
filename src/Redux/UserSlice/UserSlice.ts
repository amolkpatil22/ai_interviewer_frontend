import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLoginData } from "../../Common/AxiosInterceptor/Auth/Interfaces/Auth.interface";

const initialState: UserLoginData = {
  name: "",
  email: "",
  _id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserLoginData>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state._id = action.payload._id;
    },

    clearUser: (state) => {
      state.name = "";
      state.email = "";
      state._id = "";
    },
  },
});

// Export actions
export const { saveUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
