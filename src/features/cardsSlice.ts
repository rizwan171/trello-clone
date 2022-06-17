import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import Card from "../types/global/Card";
import {
  CardsState,
  AddCardParams,
  UpdateCardTitleParams,
  UpdateCardDescriptionParams,
  UpdateAllCardsParams,
  DeleteCardParams,
  DeleteAllListCardsParams,
  CopyCardToListParams,
  MoveCardToListParams,
  CopyAllCardsToNewListParams,
  AddTagToCardParams,
  RemoveTagFromCardParams,
} from "../types/reducers/CardsSlice";

const cardsData: Card[] = JSON.parse(localStorage.getItem("cards") || "[]");
const initialState: CardsState = {
  value: cardsData ? cardsData : [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state: CardsState, action: PayloadAction<AddCardParams>) => {
      state.value.push({ ...action.payload, id: uuidv4() });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    updateCardTitle: (state: CardsState, action: PayloadAction<UpdateCardTitleParams>) => {
      state.value.map((card) => {
        if (card.id === action.payload.id) {
          card.title = action.payload.title;
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    updateCardDescription: (state: CardsState, action: PayloadAction<UpdateCardDescriptionParams>) => {
      state.value.map((card) => {
        if (card.id === action.payload.id) {
          card.description = action.payload.description;
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    updateAllCards: (state: CardsState, action: PayloadAction<UpdateAllCardsParams>) => {
      state.value = [...action.payload];
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteCard: (state: CardsState, action: PayloadAction<DeleteCardParams>) => {
      state.value = state.value.filter((card) => card.id !== action.payload);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteAllListCards: (state: CardsState, action: PayloadAction<DeleteAllListCardsParams>) => {
      state.value = state.value.filter((card) => card.listId !== action.payload);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    deleteAllCards: (state: CardsState) => {
      state.value = [];
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    copyCardToList: (state: CardsState, action: PayloadAction<CopyCardToListParams>) => {
      const cardToCopy = state.value.find((card) => card.id === action.payload.id);
      if (cardToCopy) {
        state.value.push({
          ...cardToCopy,
          id: uuidv4(),
          listId: action.payload.listId,
        });
      }
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    moveCardToList: (state: CardsState, action: PayloadAction<MoveCardToListParams>) => {
      state.value.map((card) => {
        if (card.id === action.payload.id) {
          card.listId = action.payload.listId;
        }

        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    copyAllCardsToNewList: (state: CardsState, action: PayloadAction<CopyAllCardsToNewListParams>) => {
      const cardsToCopy = state.value
        .filter((card) => card.listId === action.payload.from)
        .map((card) => {
          return { ...card, id: uuidv4(), listId: action.payload.to };
        });
      state.value.push(...cardsToCopy);
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    addTagToCard: (state: CardsState, action: PayloadAction<AddTagToCardParams>) => {
      state.value.map((card) => {
        if (card.id === action.payload.id) {
          card.tags.push(action.payload.tagId);
        }
        return card;
      });
      localStorage.setItem("cards", JSON.stringify([...state.value]));
    },
    removeTagFromCard: (state: CardsState, action: PayloadAction<RemoveTagFromCardParams>) => {
      state.value.map((card) => {
        if (card.id === action.payload.id) {
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
