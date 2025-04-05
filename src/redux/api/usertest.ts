import { api as generatedApi } from "../../graphql/generated"
import { SignInMutationVariables } from "../../graphql/graphql"
import { toggleLoader } from "../reducer/loader.slice"
import { toggleToast } from "../reducer/toast.slice"
import { setUser } from "../reducer/user.slice"

const userTestApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Users"],
  endpoints: {
    SignIn: {
      onQueryStarted: async (
        arg: SignInMutationVariables,
        { dispatch, queryFulfilled }
      ) => {
        try {
          dispatch(toggleLoader({ isLoading: true, content: "Please Wait..." }))
          const { data } = await queryFulfilled
          console.log(data)
          if (data.response?.status) {
            sessionStorage.setItem("accessJWT", data.data?.accessJWT as string) ///active for 5mins
            // localStorage.setItem("refreshJWT", data.token.refreshJWT) //active for 30days
            await dispatch(userTestApi.endpoints.LoggedInUser.initiate({}))
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
    LoggedInUser: {
      transformResponse: response => response.data,

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data.data))
        } catch (error) {
          // if (error) return window.location.replace("/");
        }
      },

      // providesTags: ["CurrentUser"],
    },
  },
})

export { userTestApi }
