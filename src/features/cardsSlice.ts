import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const cardsData = JSON.parse(localStorage.getItem("cards"));
const initialState = {
  value: cardsData ? cardsData : [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action) => {
      state.value.push({ ...action.payload, id: uuidv4() });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    updateCardTitle: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.id) {
          card.title = action.payload.title;
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    updateCardDescription: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.id) {
          card.description = action.payload.description;
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    updateAllCards: (state, action) => {
      state.value = [...action.payload];
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteCard: (state, action) => {
      state.value = state.value.filter((card) => card.id !== action.payload);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteAllListCards: (state, action) => {
      state.value = state.value.filter((card) => card.listId !== action.payload);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteAllCards: (state) => {
      state.value = [];
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    copyCardToList: (state, action) => {
      const cardToCopy = state.value.find((card) => card.id === action.payload.cardId);
      state.value.push({
        ...cardToCopy,
        id: uuidv4(),
        listId: action.payload.listId,
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    moveCardToList: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.cardId) {
          card.listId = action.payload.listId;
        }

        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    copyAllCardsToNewList: (state, action) => {
      const cardsToCopy = state.value
        .filter((card) => card.listId === action.payload.from)
        .map((card) => {
          return { ...card, id: uuidv4(), listId: action.payload.to };
        });
      state.value.push(...cardsToCopy);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    addTagToCard: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.cardId) {
          card.tags.push(action.payload.tagId);
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    removeTagFromCard: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.cardId) {
          const tagIndex = card.tags.indexOf(action.payload.tagId);
          card.tags.splice(tagIndex, 1);
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    removeTagFromAllCards: (state, action) => {
      state.value.map((card) => {
        const tagIndex = card.tags.indexOf(action.payload.tagId);
        card.tags.splice(tagIndex, 1);
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    addFilesToCard: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.cardId) {
          card.attachments = [...card.attachments, ...action.payload.upload];
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    removeFileFromCard: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.cardId) {
          card.attachments = card.attachments.filter((item) => item.fileId !== action.payload.id);
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    updateFileInCard: (state, action) => {
      state.value.map((card) => {
        if (card.id === action.payload.cardId) {
          const index = card.attachments.findIndex((item) => item.fileId === action.payload.id);
          console.log("act1", index);
          console.log("act1", action.payload.name);

          card.attachments[index].name = action.payload.name;
        }
        console.log("act", card.attachments);
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
  },
});

export const {
  addCard,
  updateAllCards,
  updateCardTitle,
  updateCardDescription,
  deleteCard,
  deleteAllListCards,
  deleteAllCards,
  copyAllCardsToNewList,
  copyCardToList,
  moveCardToList,
  addTagToCard,
  removeTagFromCard,
  removeTagFromAllCards,
  addFilesToCard,
  removeFileFromCard,
  updateFileInCard,
} = cardsSlice.actions;
export default cardsSlice.reducer;
