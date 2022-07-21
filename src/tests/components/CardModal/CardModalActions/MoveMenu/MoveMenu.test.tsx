import { fireEvent, screen, waitFor } from "@testing-library/react";
import { RootState } from "../../../../../app/store";
import MoveMenu from "../../../../../components/CardModal/CardModalActions/MoveMenu/MoveMenu";
import { renderWithProviders } from "../../../../utils/renderUtils";
import { generateModalActionsVisibilityState } from "../../../../utils/stateUtils";

describe("MoveMenu", () => {
  let initialState: Partial<RootState>;

  beforeEach(() => {
    const modalActionsVisibilityState = generateModalActionsVisibilityState();
    initialState = {
      cards: {
        value: [
          {
            id: "1",
            title: "Test Card",
            description: "Test Description",
            listId: "1",
            tags: [],
            attachments: [],
          },
        ],
      },
      lists: {
        value: [
          {
            id: "1",
            title: "List 1",
          },
          {
            id: "2",
            title: "List 2",
          },
        ],
      },
      currentSelectedCard: {
        value: {
          id: "1",
          title: "Test Card",
          description: "Test Description",
          listId: "1",
          tags: [],
          attachments: [],
        },
      },
      modalActionMenusVisibility: {
        value: {
          ...modalActionsVisibilityState.value,
          moveMenuOpen: true,
        },
      },
    };
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<MoveMenu />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should close move menu", () => {
    const { store } = renderWithProviders(<MoveMenu />, { preloadedState: initialState });
    const stateBeforeClose = store.getState();
    expect(stateBeforeClose.modalActionMenusVisibility.value.moveMenuOpen).toBeTruthy();

    const closeIcon = screen.getByTestId("close-icon");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    const stateAfterClose = store.getState();
    expect(stateAfterClose.modalActionMenusVisibility.value.moveMenuOpen).toBeFalsy();
  });

  it("should move card to selected list", async () => {
    const { store } = renderWithProviders(<MoveMenu />, { preloadedState: initialState });
    const stateBeforeMove = store.getState();
    expect(stateBeforeMove.modalActionMenusVisibility.value.moveMenuOpen).toBeTruthy();
    expect(stateBeforeMove.cards.value).toHaveLength(1);
    const card = stateBeforeMove.cards.value[0];
    expect(card.listId).toBe("1");
    expect(stateBeforeMove.currentSelectedCard.value?.listId).toBe("1");

    const listSelector = screen.getByRole("combobox") as HTMLSelectElement;
    expect(listSelector).toBeInTheDocument();
    expect(listSelector.options).toHaveLength(2);

    const expectedOptionValues = ["", "2"];
    const actualOptionValues = [...listSelector.options].map((option) => option.value);
    expect(actualOptionValues).toStrictEqual(expectedOptionValues);

    const expectedTextValues = ["Select list", "List 2"];
    const actualTextValues = [...listSelector.options].map((option) => option.textContent);
    expect(actualTextValues).toStrictEqual(expectedTextValues);

    fireEvent.change(listSelector, { target: { value: "2" } });

    const moveButton = screen.getAllByText("Move Card").find((element) => element.tagName === "BUTTON") as HTMLButtonElement;
    expect(moveButton).toBeInTheDocument();

    fireEvent.click(moveButton);

    await waitFor(() => {
      expect(store.getState()).not.toEqual(stateBeforeMove);
    });

    const stateAfterMove = store.getState();
    expect(stateAfterMove.cards.value).toHaveLength(1);
    const copiedCard = stateAfterMove.cards.value[0];
    expect(copiedCard.id).toBeDefined();
    expect(copiedCard.title).toBe(card.title);
    expect(copiedCard.description).toBe(card.description);
    expect(copiedCard.listId).toBe("2");
    expect(copiedCard.tags).toStrictEqual(card.tags);
    expect(copiedCard.attachments).toStrictEqual(card.attachments);
    expect(stateAfterMove.currentSelectedCard.value?.listId).toBe("2");
    expect(stateAfterMove.modalActionMenusVisibility.value.moveMenuOpen).toBeFalsy();
  });
});
