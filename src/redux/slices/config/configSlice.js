import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "English",
  loading: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updateLanguage, setLoading } = configSlice.actions;

export default configSlice.reducer;
