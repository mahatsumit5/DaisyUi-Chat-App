import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApiWithRestAPI = createApi({
  reducerPath: "RESTBaseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
    prepareHeaders: headers => {
      return headers.set(
        "Authorization",
        `Bearer ${sessionStorage.getItem("accessJWT") as string}`
      )
    },
  }),
  endpoints: () => ({}),
  tagTypes: [],
})
