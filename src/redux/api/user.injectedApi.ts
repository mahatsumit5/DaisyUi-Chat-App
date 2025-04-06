import { userGraphqlApi } from "../../graphql/api/userGraphql.api"
import { ILogin } from "../../types"
import { toggleLoader } from "../reducer/loader.slice"
import { toggleToast } from "../reducer/toast.slice"
import { baseApiWithRestAPI as api } from "./restBaseApi"

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    login: builder.mutation<ILogin, { email: string; password: string }>({
      query: data => ({
        url: "sign-in",
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
  },
})

export { userApi as userEnhancedApi }
