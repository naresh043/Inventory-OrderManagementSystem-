import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://role-bases-backend.onrender.com/api/v1",//"http://localhost:3000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getApi: builder.query({
      query: ({ url, params = {} }) => ({
        url,
        method: "GET",
        params,
      }),
      providesTags: ["Users"],
    }),
    postApi: builder.mutation({
      query: ({ url, body }) => ({
        url,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    updateApi: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "PUT",
        body: data,
      }),
    }),

    deleteApi: builder.mutation({
      query: ({ url }) => ({
        url,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetApiQuery,
  useLazyGetApiQuery,
  usePostApiMutation,
  useDeleteApiMutation,
  useUpdateApiMutation,
} = apiSlice;
