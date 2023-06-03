import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isAdmin: false,
  loading: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    updateAuthState: (state, action) => {
      state.isAuth = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updateAuthState, setLoading } = configSlice.actions;

export default configSlice.reducer;
