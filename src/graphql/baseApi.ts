import qs from "qs"
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query"
import { GraphQLClient } from "graphql-request" // Import type definitions from the generated file
import { Mutex } from "async-mutex"

const HEADER_TYPE_APPLICATION_FORM = "application/x-www-form-urlencoded"
export const client: any = new GraphQLClient("http://localhost:8000/graphql")
const mutex = new Mutex()

const authBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/graphql",
})

const graphqlBaseQuery = graphqlRequestBaseQuery({
  client,
  prepareHeaders: headers => {
    headers.set(
      "Authorization",
      `Bearer ${sessionStorage.getItem("accessJWT") as string}`
    )
    return headers
  },
})
export const baseQueryWithReauthGraphql: any = async (
  { document, variables }: any,
  api: any,
  extraOptions: any
) => {
  await mutex.waitForUnlock()
  let result
  try {
    result = await graphqlBaseQuery({ document, variables }, api, extraOptions)
    return result
  } catch (e: any) {
    console.log(e)
    // Intercept HTTP 401 responses and do the refresh token call
    if (e && e.response && e.response.status === 401) {
      // Even if multiple apis fail simultaneously with 401
      // only allow one api call to refresh the token
      if (!mutex.isLocked()) {
        const release = await mutex.acquire()
        try {
          const getState = api.getState as () => any
          const refreshToken = getState().auth.refreshToken
          // Use the proper refresh token request format here
          const refreshResult: any = await authBaseQuery(
            {
              url: "",
              method: "POST",
              body: qs.stringify({ refreshToken }),
              headers: { "Content-Type": HEADER_TYPE_APPLICATION_FORM },
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            // TODO : Dispatch the updated token information
            // api.dispatch(updateToken(refreshResult.data))

            // Once the tokens are updated, do the failed api call again
            result = await graphqlBaseQuery(
              { document, variables },
              api,
              extraOptions
            )
          } else {
            // TODO : Dispatch an error if the refresh token call threw an error
            // api.dispatch(updateRefreshTokenError(true))
          }
        } finally {
          release()
        }
      } else {
        await mutex.waitForUnlock()
        result = await graphqlBaseQuery(
          { document, variables },
          api,
          extraOptions
        )
      }
      return result
    }
  }
}

export const baseApiWithGraphql = createApi({
  reducerPath: "GraphQlApi",
  baseQuery: baseQueryWithReauthGraphql,
  endpoints: () => ({}),

  tagTypes: [],
})
