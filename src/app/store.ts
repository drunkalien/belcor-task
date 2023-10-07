import { AnyAction, configureStore } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";

import userReducer from "../features/user/userSlice";
import resultsReducer from "../features/results/resultsSlice";
import testsReducer from "../features/tests/testsSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  middleware: [thunk],
  reducer: {
    user: userReducer,
    results: resultsReducer,
    tests: testsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): ThunkDispatch<RootState, void, AnyAction> =>
  useDispatch();
