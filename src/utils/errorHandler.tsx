import { isRejectedWithValue } from "@reduxjs/toolkit"
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit"
import { toggleDialog } from "../redux/reducer/dialog.slice"
import { toggleToast } from "../redux/reducer/toast.slice"

/**
 * Log a warning and show a toast!
 */
// Define the type for your middleware function

type ErrorResponse = {
  data: {
    status: boolean
    message: string
  }
  status: number
}
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!

    if (isRejectedWithValue(action)) {
      const errorResponse: ErrorResponse = action.payload as ErrorResponse
      if (
        errorResponse.data.message === "jwt expired" ||
        errorResponse.data.message === "jwt malformed" ||
        errorResponse.data.message === `"exp" claim timestamp check failed`
      ) {
        errorResponse.data.message = "Session expired.Please log in again."
        return next(action)
      }

      switch (errorResponse.data.message) {
        case "You are not logged in":
          errorResponse.data.message = "Session expired.Please log in again."
          api.dispatch(
            toggleDialog({
              heading: "Session Expired.",
              content: "Session expired. Please login again",
              type: "login",
            })
          )
          return next(action)

        case "Invalid Compact JWS":
          return next(action)

        case `"exp" claim timestamp check failed`:
          api.dispatch(
            toggleDialog({
              heading: "Session Expired.",
              content: "Session expired. Please login again",
              type: "login",
            })
          )
          return next(action)
        default:
          break
      }

      api.dispatch(
        toggleToast({
          isOpen: true,
          content: {
            id: Math.ceil(Math.random() * 10000000),
            message: errorResponse.data.message,

            type: "error",
          },
        })
      )
    }

    return next(action)
  }
