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
      `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVWbWpMSWhKNWpsYU44WUFPN2hFYSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ma3AzNGYxeWZhanVvcWo3LmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJoYW5XRlIzdnppY2Jxbk5IN2d5dDJHWmluamNVVnE3Q0BjbGllbnRzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaWF0IjoxNzQyNTYyODE4LCJleHAiOjE3NDI2NDkyMTgsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6ImhhbldGUjN2emljYnFuTkg3Z3l0MkdaaW5qY1VWcTdDIn0.qexv5sbwtnwvhDR_5Qu4SY24fH-Uzd0WsguUK4xniSynOtP07tsgpus5hQVbGA_hBWbpaXt3DE6_F4fceYppMwja5fW0ancZdLJY4KmtBHmOAmQgHSO7FVvixRggg7XXb07f_wefyL3G_7w_xU3Cr8yR_t5Jvs9GCPTYB7_E82jfWlopdsx-kIsmgBhmx71j7HCJa3aVmPfTIjWjkDAGVUZWxmLHkNwgY6EqVZNPyunMwWj_8tjR7D-6nCSNYb4gEwz9y20ZqpKJBlcm4EsCQn9GBpVpffDChasdmnvpVwENKzNK8tfy0Ey4ByxDqCxQB0kmtKFvM3mhF8V-Md3shQ`
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
  baseQuery: baseQueryWithReauthGraphql,
  endpoints: () => ({}),
  tagTypes: [],
})
