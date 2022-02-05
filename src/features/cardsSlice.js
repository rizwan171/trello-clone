import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
//TODO the below isnt possible
import { readFileSync } from 'fs';

const rawData = readFileSync('../data/data.json');
const parsedJson = JSON.parse(rawData);

const initialState = {
  value: [...parsedJson.cards],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() });
    },
  },
});

export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;
