import { createSlice } from "@reduxjs/toolkit";
import { BookType } from "../../../types/book";

interface IBook {
  allBooks: BookType[];
  featuredBooks: BookType[];
}

const initialState: IBook = {
  allBooks: [],
  featuredBooks: [],
};

const bookSlice = createSlice({
  name: "Book",
  initialState,
  reducers: {},
});

// export const {} = BookSlice.actions;

export default bookSlice.reducer;
