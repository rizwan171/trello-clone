import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  value: false
}

export const boardOptionSlice = createSlice({
  name: "boardOptions",
  initialState,
  reducers: {
    toggleBoardVisiblity: (state, _) => {
      state.value = !state.value;
    }
  }
})

export const { toggleBoardVisiblity } = boardOptionSlice.actions;
export default boardOptionSlice.reducer;
