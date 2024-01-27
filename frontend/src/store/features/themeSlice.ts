import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  isDarkTheme: JSON.parse(localStorage.getItem("isDarkTheme") ?? "false"),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
      localStorage.setItem("isDarkTheme", JSON.stringify(state.isDarkTheme));
    },
  },
});

export default themeSlice.reducer;
export const { setDarkTheme } = themeSlice.actions;
