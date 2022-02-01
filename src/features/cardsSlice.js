import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  value: [
    // TODO set this to empty array after testing
    {
      id: 'card-1',
      listId: 'list-1',
      content: 'Test Content 1',
    },
    {
      id: 'card-2',
      listId: 'list-1',
      content: 'Test Content 2 which is slightly longer in length than the first card',
    },
    {
      id: 'card-3',
      listId: 'list-2',
      content: 'Test Content 1',
    },
    {
      id: 'card-4',
      listId: 'list-2',
      content: 'Test Content 2 which is slightly longer in length than the first card',
    },
    {
      id: 'card-5',
      listId: 'list-3',
      content: 'Test Content 1',
    },
    {
      id: 'card-6',
      listId: 'list-3',
      content: 'Test Content 2 which is slightly longer in length than the first card',
    },
  ],
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() })
    },
  },
})

export const { addCard } = cardsSlice.actions
export default cardsSlice.reducer
