import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SideBarState {
  mobileOpen: boolean;
  isClosing: boolean;
}

const initialState: SideBarState = {
  mobileOpen: false,
  isClosing: false,
};

export const sideBarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileOpen = action.payload;
    },
    setIsClosing: (state, action: PayloadAction<boolean>) => {
      state.isClosing = action.payload;
    },
  },
});

export default sideBarSlice.reducer;
export const { setMobileOpen, setIsClosing } = sideBarSlice.actions;
