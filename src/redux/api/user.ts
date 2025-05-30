import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userApiUrl } from "./serverUrl"
import {
  IAllUsersResponse,
  IGetAllUsersParams,
  IGetNewAcessJWTResponse,
  ILogin,
  IResponse,
  ISignUpParams,
  IUser,
} from "../../types"
import { socket } from "../reducer/socket.slice"
import { toggleLoader } from "../reducer/loader.slice"
import { toggleToast } from "../reducer/toast.slice"
import { setUser } from "../reducer/user.slice"
import { userGraphqlApi } from "../../graphql/api/userGraphql.api"
const userApi = createApi({
  reducerPath: "UserApi",
  tagTypes: ["Users", "CurrentUser"],
  keepUnusedDataFor: 30,

  baseQuery: fetchBaseQuery({
    baseUrl: userApiUrl,
    prepareHeaders: headers => {
      headers.set(
        "Authorization",
        `Bearer ${sessionStorage.getItem("accessJWT") as string}`
      )
      return headers
    },
    credentials: "include",
  }),
  endpoints: builder => ({
    getAllUsers: builder.query<IAllUsersResponse, IGetAllUsersParams | null>({
      query: params =>
        `all-users?order=${params?.order}&&page=${params?.page}&&take=${params?.take}&&search=${params?.search}`,

      providesTags: ["Users"],
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, cacheEntryRemoved }
      ) => {
        try {
          await cacheDataLoaded
        } catch (error) {
          console.log(error)
        }
        await cacheEntryRemoved
      },
    }),
    logoutUser: builder.mutation<{ status: boolean }, void>({
      query: () => ({ url: "logout", method: "POST" }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(toggleLoader({ isLoading: true, content: "Please Wait..." }))
          await queryFulfilled
          dispatch(toggleLoader({ isLoading: false }))
          socket.close()
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }))
        }
      },
    }),
    login: builder.mutation<ILogin, { email: string; password: string }>({
      query: data => ({
        url: "sign-in",
        method: "POST",
        body: data,
      }),
      transformResponse(baseQueryReturnValue: ILogin) {
        return baseQueryReturnValue
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(toggleLoader({ isLoading: true, content: "Please Wait..." }))
          const { data } = await queryFulfilled
          if (data.status) {
            sessionStorage.setItem("accessJWT", data.token.accessJWT)
            console.log("inside if statement")
            await dispatch(userGraphqlApi.endpoints.LoggedInUser.initiate())
          }
          dispatch(toggleLoader({ isLoading: false }))

          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Welcome back",
                type: "info",
              },
            })
          )
        } catch (error) {
          console.log(error)

          dispatch(toggleLoader({ isLoading: false }))
        }
      },

      invalidatesTags: ["Users"],
    }),

    getLoggedInUser: builder.query<IUser, void>({
      query: () => "loggedin",
      transformResponse: (response: { status: boolean; data: IUser }) =>
        response.data,

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data as IUser))
          socket.connect()
        } catch (error) {
          // if (error) return window.location.replace("/");
        }
      },

      providesTags: ["CurrentUser"],
    }),
    signUpUser: builder.mutation<IResponse, ISignUpParams>({
      query: data => ({
        url: "sign-up",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(toggleLoader({ isLoading: true, content: "Please Wait..." }))
          await queryFulfilled
          dispatch(toggleLoader({ isLoading: false }))
          socket.emit("disconnect")

          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Thank you signing up.",
                type: "info",
              },
            })
          )
        } catch (error) {
          dispatch(toggleLoader({ isLoading: false }))
        }
      },
    }),
    getNewAccessJWT: builder.mutation<IGetNewAcessJWTResponse, void>({
      query: () => ({
        url: "new-accessJWT",
        headers: {
          refreshJWT: localStorage.getItem("refreshJWT") as string,
        },

        method: "PATCH",
      }),
    }),
    changePassword: builder.mutation<
      { status: boolean; message: string },
      { password: string }
    >({
      query: data => ({ url: "reset-password", method: "PUT", body: data }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(
            toggleToast({
              isOpen: true,
              content: {
                id: Math.ceil(Math.random() * 10000000),
                message: "Your password has been changed",
                type: "success",
              },
            })
          )
        } catch (error) {
          console.log(error)
        }
      },
    }),
    uploadImage: builder.mutation<unknown, File>({
      query: image => {
        const formData = new FormData()
        formData.append("profile", image)
        return {
          url: "upload-profile",
          body: formData,
          method: "PUT",
        }
      },
      invalidatesTags: ["CurrentUser"],
    }),
  }),
})

export { userApi }
