import { createSlice } from "@reduxjs/toolkit";
import { BookType } from "../../../types/book";

interface IBook {
  wishList: BookType[];
  currentlyReading: BookType[];
}

const initialState: IBook = {
  wishList: [],
  currentlyReading: [],
};

const listSlice = createSlice({
  name: "List",
  initialState,
  reducers: {},
});

// export const {} = BookSlice.actions;

export default listSlice.reducer;
