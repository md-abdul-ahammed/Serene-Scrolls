import { ILoginBody } from "../../../types/user";
import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    login: builder.mutation({
      query: (data: ILoginBody) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("result: ", result);

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );

          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
