import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BookModel } from "../services/bookService";

interface LoansState {
  borrowedBooks: BookModel[];
}

const initialState: LoansState = {
  borrowedBooks: [],
};

const loansSlice = createSlice({
  name: "loans",
  initialState,
  reducers: {
    borrowBook: (state, action: PayloadAction<BookModel>) => {
      const exists = state.borrowedBooks.find(
        (b) => b.id === action.payload.id,
      );
      if (!exists) {
        state.borrowedBooks.push(action.payload);
      }
    },
    returnBook: (state, action: PayloadAction<string>) => {
      state.borrowedBooks = state.borrowedBooks.filter(
        (b) => b.id !== action.payload,
      );
    },
  },
});

export const { borrowBook, returnBook } = loansSlice.actions;

export default loansSlice.reducer;
