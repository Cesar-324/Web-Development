import { configureStore } from "@reduxjs/toolkit";
import loansReducer from "./loansSlice";
import searchReducer from "./searchSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    loans: loansReducer,
    search: searchReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
