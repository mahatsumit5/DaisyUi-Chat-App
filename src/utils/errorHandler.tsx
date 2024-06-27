import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toggleToast } from "../redux/reducer/toast.slice";

/**
 * Log a warning and show a toast!
 */
// Define the type for your middleware function

type ErrorResponse = {
  data: {
    status: boolean;
    message: string;
  };
  status: number;
};
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!

    if (isRejectedWithValue(action)) {
      const errorResponse: ErrorResponse = action.payload as ErrorResponse;
      if (
        errorResponse.data.message === "jwt expired" ||
        errorResponse.data.message === "jwt malformed"
      ) {
        errorResponse.data.message = "Session expired.Please log in again.";
        return next(action);
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
      );
    }

    return next(action);
  };
