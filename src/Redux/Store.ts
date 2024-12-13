import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import userSlice from "./UserSlice/UserSlice";
import alertSlice from "./AlertSlice/AlertSlice";

const rootReducer = combineReducers({
  user: userSlice,
  alert:alertSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization checks for redux-persist
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
