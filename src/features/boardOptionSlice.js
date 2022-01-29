import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  value: false
}

export const boardOptionSlice = createSlice({
  name: "boardOptions",
  initialState,
  reducers: {
    toggleBoardVisiblity: (state, _) => {
      const previousState = state.value;
      state.value = !previousState;
    }
  }
})

export const { toggleBoardVisiblity } = boardOptionSlice.actions;
export default boardOptionSlice.reducer;
