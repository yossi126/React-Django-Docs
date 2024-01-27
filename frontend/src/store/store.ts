import { configureStore } from "@reduxjs/toolkit";
import { sideBarSlice } from "./features/sideBarSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// ...

export const store = configureStore({
  reducer: {
    sideBar: sideBarSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
