import { fireEvent, screen } from "@testing-library/react";
import { DragUpdate } from "react-beautiful-dnd";
import { RootState } from "../../app/store";
import App from "../../components/App";
import Card from "../../types/global/Card";
import { BoardState } from "../../types/reducers/BoardSlice";
import { CardsState } from "../../types/reducers/CardsSlice";
import { CurrentSelectedCardState } from "../../types/reducers/CurrentSelectedCardSlice";
import { CurrentSelectedListState } from "../../types/reducers/CurrentSelectedListSlice";
import { ListsState } from "../../types/reducers/ListsSlice";
import { renderWithProviders } from "../utils/renderUtils";

describe("App", () => {
  let boardState: BoardState;
  let listsState: ListsState;
  let cardsState: CardsState;
  let currentSelectedCardState: CurrentSelectedCardState;
  let currentSelectedListState: CurrentSelectedListState;
  let defaultInitialState: Partial<RootState>;

  beforeEach(() => {
    boardState = {
      value: {
        id: "1",
        title: "Board 1",
      },
    };

    listsState = {
      value: [
        {
          id: "1",
          title: "List 1",
        },
        {
          id: "2",
          title: "List 2",
        },
        {
          id: "3",
          title: "List 3",
        },
      ],
    };

    const cards: Card[] = [];
    for (let i = 0; i < 9; i++) {
      cards.push({
        id: (i + 1).toString(),
        listId: ((i % 3) + 1).toString(),
        title: `Card ${i % 3}`,
        description: `Description ${i % 3}`,
        attachments: [],
        tags: [],
      });
    }
    cardsState = { value: [...cards] };

    currentSelectedCardState = {
      value: { ...cards[0] },
    };

    currentSelectedListState = {
      value: {
        id: "1",
        title: "List 1",
      },
    };

    defaultInitialState = {
      board: { ...boardState },
      lists: { ...listsState },
      cards: { ...cardsState },
    };
  });

  it("should render successfully with no board data", () => {
    const view = renderWithProviders(<App />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with existing board data", () => {
    const view = renderWithProviders(<App />, { preloadedState: defaultInitialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with list selected", () => {
    const initialState: Partial<RootState> = {
      board: { ...boardState },
      lists: { ...listsState },
      cards: { ...cardsState },
      currentSelectedList: { ...currentSelectedListState },
    };
    const view = renderWithProviders(<App />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with card selected", () => {
    const initialState: Partial<RootState> = {
      board: { ...boardState },
      lists: { ...listsState },
      cards: { ...cardsState },
      currentSelectedCard: { ...currentSelectedCardState },
    };
    const view = renderWithProviders(<App />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with board options menu open", () => {
    const initialState: Partial<RootState> = {
      board: { ...boardState },
      boardOptions: { value: true },
      lists: { ...listsState },
      cards: { ...cardsState },
    };
    const view = renderWithProviders(<App />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });
});
