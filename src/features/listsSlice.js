import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  value: [
    // TODO set this to empty array after testing
    {
      id: 'list-1',
      title: 'To Do',
    },
    {
      id: 'list-2',
      title: 'Doing',
    },
    {
      id: 'list-3',
      title: 'Done',
    },
  ],
}

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() })
    },
    editTitle: (state, action) => {
      const { listId, newTitle } = action.payload
      const listIndex = state.value.findIndex((list) => list.id === listId)
      state.value[listIndex].title = newTitle
    },
    removeList: (state, action) => {
      const listIndex = state.value.findIndex((list) => list.id === action.payload)
      state.value = state.value.filter((list) => list.id !== listIndex)
    },
    reorderList: () => {},
  },
})

export const { addList, editTitle } = listsSlice.actions
export default listsSlice.reducer
