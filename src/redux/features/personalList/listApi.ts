import { apiSlice as api } from "../../api/apiSlice";

const listApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addWishList: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
    getWishlist: builder.query({
      query: () => `/wishlist`,
      providesTags: [],
    }),
    addReadingList: builder.mutation({
      query: (data) => ({
        url: `/reading`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
    getReadingList: builder.query({
      query: () => `/reading`,
      providesTags: [],
    }),
    deleteReading: builder.mutation({
      query: (id: string) => ({
        url: `/reading/${id}`,
        method: "DELETE",
      }),
    }),
    deleteWishlist: builder.mutation({
      query: (id: string) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddWishListMutation,
  useGetWishlistQuery,
  useDeleteWishlistMutation,
  useAddReadingListMutation,
  useGetReadingListQuery,
  useDeleteReadingMutation,
} = listApi;
