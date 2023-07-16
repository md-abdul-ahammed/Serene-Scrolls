import { BookType } from "../../../types/book";
import { apiSlice as api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({
        searchTerm,
        genre,
        publication,
      }: {
        searchTerm?: string;
        genre?: string;
        publication?: string;
      }) =>
        `/book?searchTerm=${searchTerm ?? ""}&genre=${
          genre ?? ""
        }&publication=${publication ?? ""}`,
      providesTags: ["books"],
    }),
    singleBook: builder.query({
      query: (id: string) => `/book/${id}`,
      providesTags: ["list", "books"],
    }),
    featuredBook: builder.query({
      query: () => `/book/featured`,
      providesTags: ["books"],
    }),
    genreList: builder.query({
      query: () => `/book/allGenre`,
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (data: BookType) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    editBook: builder.mutation({
      query: ({ data, id }: { data: BookType; id: string }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    addReview: builder.mutation({
      query: (data: {
        review: string;
        bookId: string;
        reviewerId: string;
      }) => ({
        url: `/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    getReviews: builder.query({
      query: (id: string) => `/review/${id}`,
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useDeleteBookMutation,
  useGetBooksQuery,
  useSingleBookQuery,
  useFeaturedBookQuery,
  useAddBookMutation,
  useGetReviewsQuery,
  useAddReviewMutation,
  useGenreListQuery,
  useEditBookMutation,
} = bookApi;
