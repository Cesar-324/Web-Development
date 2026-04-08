import { configureStore } from "@reduxjs/toolkit";
import loansReducer from "./loansSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    loans: loansReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
