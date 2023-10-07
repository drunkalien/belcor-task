import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
