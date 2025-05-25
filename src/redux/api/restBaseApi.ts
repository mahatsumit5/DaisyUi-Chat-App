import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
const apiUrl = import.meta.env.VITE_ROOTSERVER

export const baseApiWithRestAPI = createApi({
  reducerPath: "RESTBaseAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/api/v1`,
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
