import { api as generatedApi } from "../../graphql/generated"
import { IUser } from "../../types"
import { toggleLoader } from "../reducer/loader.slice"
import { toggleToast } from "../reducer/toast.slice"
import { setUser } from "../reducer/user.slice"
const userGraphqlApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Users", "CurrentUser"],

  endpoints: {
    SignIn: {
      transformResponse: response => {
        return response
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(toggleLoader({ isLoading: true, content: "Please Wait..." }))
          const { data } = await queryFulfilled

          if (data.data?.response?.status) {
            sessionStorage.setItem(
              "accessJWT",
              data.data.data?.accessJWT as string
            )
            await dispatch(userGraphqlApi.endpoints.LoggedInUser.initiate(null))
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
          }
          dispatch(toggleLoader({ isLoading: false }))
        } catch (error) {
          console.log(error)

          dispatch(toggleLoader({ isLoading: false }))
        }
      },

      invalidatesTags: ["Users"],
    },
    LoggedInUser: {
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data?.data as IUser))
        } catch (error) {
          if (error) return window.location.replace("/")
        }
      },
    },
    SignUp: {
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          dispatch(toggleLoader({ isLoading: true, content: "Please Wait..." }))
          const { data } = await queryFulfilled
          if (data.data?.response?.status) {
            dispatch(
              toggleToast({
                isOpen: true,
                content: {
                  id: Math.ceil(Math.random() * 10000000),
                  message: "Account created successfully",
                  type: "info",
                },
              })
            )
          }
          dispatch(toggleLoader({ isLoading: false }))
        } catch (error) {
          console.log(error)

          dispatch(toggleLoader({ isLoading: false }))
        }
      },
    },
  },
})

export { userGraphqlApi }
