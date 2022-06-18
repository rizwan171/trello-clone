import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// The below useAppDispatch does not require a return type, hence the eslint disable comment
// See https://stackoverflow.com/questions/70711795/missing-return-type-on-function-useappdispatch for more info
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
