import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchResultsApi } from "../../api/results";
import { ResultsResponse } from "../../types/ResultsResponseType";

type InitialState = {
  results: ResultsResponse;
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  results: [],
  loading: false,
  error: null,
};

export const fetchResults = createAsyncThunk(
  "results/fetchResults",
  async () => {
    const response = await fetchResultsApi();
    return response;
  },
);

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload;
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export default resultsSlice.reducer;
