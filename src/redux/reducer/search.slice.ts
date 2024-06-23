import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type QueryType =
  | "Peoples"
  | "Sent-Request"
  | "Friend-Request"
  | "Friends"
  | "Messages"
  | null;
interface InitialState {
  query: string;
  type: QueryType;
}

interface SetQueryProps {
  query: string;
}
const initialState: InitialState = {
  query: "",
  type: "Friend-Request",
};
const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, { payload }: PayloadAction<SetQueryProps>) {
      state.query = payload.query;
    },
    setQueryType(state, { payload }: PayloadAction<QueryType>) {
      state.type = payload;
    },
  },
});
export default searchReducer.reducer;
export const { setQuery, setQueryType } = searchReducer.actions;
