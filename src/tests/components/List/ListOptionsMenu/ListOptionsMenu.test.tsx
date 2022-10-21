import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../app/store";
import ListOptionsMenu from "../../../../components/List/ListOptionsMenu/ListOptionsMenu";
import Card from "../../../../types/global/Card";
import List from "../../../../types/global/List";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("ListOptionsMenu", () => {
  let initialState: Partial<RootState>;
  let list: List;
  let cards: Card[];

  beforeEach(() => {
    list = {
      id: "1",
      title: "Test List",
    };

    cards = [
      {
        id: "1",
        title: "Card 1",
        listId: "1",
        description: "Description 1",
        tags: [],
        attachments: [],
      },
      {
        id: "2",
        title: "Card 2",
        listId: "1",
        description: "Description 2",
        tags: [],
        attachments: [],
      },
      {
        id: "3",
        title: "Card 3",
        listId: "2",
        description: "Description 3",
        tags: [],
        attachments: [],
      },
    ];

    initialState = {
      cards: {
        value: [...cards],
      },
      lists: {
        value: [
          {
            ...list,
          },
        ],
      },
      currentSelectedList: {
        value: {
          ...list,
        },
      },
      listOptionsMenuPosition: {
        value: {
          top: 10,
          left: 10,
        },
      },
    };
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<ListOptionsMenu />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should copy the current selected list", () => {
    const { store } = renderWithProviders(<ListOptionsMenu />, { preloadedState: initialState });
    expect(store.getState().lists.value).toHaveLength(1);
    expect(store.getState().lists.value[0]).toStrictEqual(list);
    expect(store.getState().currentSelectedList.value).toStrictEqual(list);
    expect(store.getState().cards.value).toHaveLength(3);
    expect(store.getState().cards.value).toStrictEqual(cards);

    const copyListButton = screen.getByText("Copy list...") as HTMLButtonElement;
    expect(copyListButton).toBeInTheDocument();

    fireEvent.click(copyListButton);

    expect(store.getState().lists.value).toHaveLength(2);
    expect(store.getState().lists.value[1].id).toBeDefined();
    expect(store.getState().lists.value[1].title).toStrictEqual(list.title);
    expect(store.getState().cards.value).toHaveLength(5);
    // the map below is used to omit id from the object and is needed, though eslint enforces no unused vars here
    // eslint-disable-next-line
    const cardsWithoutId = cards.map(({ id, ...card }) => card);
    const expectedCardsWithoutId = [
      ...cardsWithoutId,
      { ...cardsWithoutId[0], listId: store.getState().lists.value[1].id },
      { ...cardsWithoutId[1], listId: store.getState().lists.value[1].id },
    ];
    // the map below is used to omit id from the object and is needed, though eslint enforces no unused vars here
    // eslint-disable-next-line
    expect(store.getState().cards.value.map(({ id, ...card }) => card)).toStrictEqual(expectedCardsWithoutId);
    expect(store.getState().currentSelectedList.value).toBeNull();
  });

  it("should delete the current selected list", () => {
    const { store } = renderWithProviders(<ListOptionsMenu />, { preloadedState: initialState });
    expect(store.getState().lists.value).toHaveLength(1);
    expect(store.getState().lists.value[0]).toStrictEqual(list);
    expect(store.getState().currentSelectedList.value).toStrictEqual(list);
    expect(store.getState().cards.value).toHaveLength(3);
    expect(store.getState().cards.value).toStrictEqual(cards);

    const deleteButton = screen.getByText("Delete") as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(store.getState().lists.value).toHaveLength(0);
    expect(store.getState().currentSelectedList.value).toBeNull();
    expect(store.getState().cards.value).toHaveLength(1);
    expect(store.getState().cards.value[0]).toStrictEqual(cards[2]);
  });

  it("should close the list options menu when close icon clicked", () => {
    const { store } = renderWithProviders(<ListOptionsMenu />, { preloadedState: initialState });
    expect(store.getState().currentSelectedList.value).toStrictEqual(list);

    const closeIcon = screen.getByTestId("list-options-menu-close-icon");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    expect(store.getState().currentSelectedList.value).toBeNull();
  });

  it("should close the list options menu when mouse is clicked outside the menu", () => {
    const { store, container } = renderWithProviders(<ListOptionsMenu />, { preloadedState: initialState });
    expect(store.getState().currentSelectedList.value).toStrictEqual(list);

    fireEvent.mouseDown(container);

    expect(store.getState().currentSelectedList.value).toBeNull();
  });
});
