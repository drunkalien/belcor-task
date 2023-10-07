import { TestData } from "../../types/TestDataType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTestsApi } from "../../api/tests";

type InitialState = {
  testData: TestData[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  testData: [],
  loading: false,
  error: null,
};

export const fetchTests = createAsyncThunk("results/fetchTests", async () => {
  const response = await fetchTestsApi();
  return response;
});

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTests.fulfilled, (state, action) => {
      state.loading = false;
      state.testData = action.payload;
    });
    builder.addCase(fetchTests.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message as string;
    });
  },
});

export default resultsSlice.reducer;
