import { userGraphqlApi } from "../../graphql/api/userGraphql.api"
import { ILogin, IResponse, ISignUpParams } from "../../types"
import { toggleLoader } from "../reducer/loader.slice"
import { toggleToast } from "../reducer/toast.slice"
import { baseApiWithRestAPI as api } from "./restBaseApi"

const injectedRtkApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ILogin, { email: string; password: string }>({
      query: data => ({
        url: "/user/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    signUpUser: builder.mutation<IResponse, ISignUpParams>({
      query: data => ({
        url: "/user/sign-up",
        method: "POST",
        body: data,
      }),
    }),
  }),
})
const userApi = injectedRtkApi.enhanceEndpoints({
  addTagTypes: ["Users"],
  endpoints: {
    login: {
      transformResponse(baseQueryReturnValue: ILogin) {
        return baseQueryReturnValue
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(toggleLoader({ isLoading: true, content: "Please Wait..." }))
          const { data } = await queryFulfilled
          if (data.status) {
            sessionStorage.setItem("accessJWT", data.token.accessJWT)
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
    },
    signUpUser: {
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(toggleLoader({ isLoading: true, content: "Please Wait..." }))
          await queryFulfilled
          dispatch(toggleLoader({ isLoading: false }))

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
    },
  },
})
export { userApi as userEnhancedApi }
