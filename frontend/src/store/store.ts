import { configureStore } from "@reduxjs/toolkit";
import { sideBarSlice } from "./features/sideBarSlice";
import { themeSlice } from "./features/themeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// ...

export const store = configureStore({
  reducer: {
    sideBar: sideBarSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
