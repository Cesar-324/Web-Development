import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookModel } from "../services/bookService";

interface SearchState {
  query: string;
  results: BookModel[];
  lastSearched: number;
}

const initialState: SearchState = {
  query: "",
  results: [],
  lastSearched: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (
      state,
      action: PayloadAction<{ query: string; books: BookModel[] }>,
    ) => {
      state.query = action.payload.query;
      state.results = action.payload.books;
      state.lastSearched = Date.now();
    },
  },
});

export const { setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
