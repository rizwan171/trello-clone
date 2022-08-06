import { fireEvent, screen, waitFor } from "@testing-library/react";
import { RootState } from "../../../../../app/store";
import CopyMenu from "../../../../../components/CardModal/CardModalActions/CopyMenu/CopyMenu";
import { renderWithProviders } from "../../../../utils/renderUtils";
import { generateModalActionsVisibilityState } from "../../../../utils/stateUtils";

describe("CopyMenu", () => {
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
          copyMenuOpen: true,
        },
      },
    };
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<CopyMenu />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should close copy menu", () => {
    const { store } = renderWithProviders(<CopyMenu />, { preloadedState: initialState });
    const stateBeforeClose = store.getState();
    expect(stateBeforeClose.modalActionMenusVisibility.value.copyMenuOpen).toBeTruthy();

    const closeIcon = screen.getByTestId("close-icon");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    const stateAfterClose = store.getState();
    expect(stateAfterClose.modalActionMenusVisibility.value.copyMenuOpen).toBeFalsy();
  });

  it("should copy card to selected list", async () => {
    const { store } = renderWithProviders(<CopyMenu />, { preloadedState: initialState });
    const stateBeforeCopy = store.getState();
    expect(stateBeforeCopy.modalActionMenusVisibility.value.copyMenuOpen).toBeTruthy();
    expect(stateBeforeCopy.cards.value).toHaveLength(1);
    const card = stateBeforeCopy.cards.value[0];

    const listSelector = screen.getByRole("combobox") as HTMLSelectElement;
    expect(listSelector).toBeInTheDocument();
    expect(listSelector.options).toHaveLength(3);

    const expectedOptionValues = ["", "1", "2"];
    const actualOptionValues = [...listSelector.options].map((option) => option.value);
    expect(actualOptionValues).toStrictEqual(expectedOptionValues);

    const expectedTextValues = ["Select list", "List 1", "List 2"];
    const actualTextValues = [...listSelector.options].map((option) => option.textContent);
    expect(actualTextValues).toStrictEqual(expectedTextValues);

    fireEvent.change(listSelector, { target: { value: "2" } });

    const copyButton = screen.getAllByText("Copy Card").find((element) => element.tagName === "BUTTON") as HTMLButtonElement;
    expect(copyButton).toBeInTheDocument();

    fireEvent.click(copyButton);

    const stateAfterCopy = store.getState();
    expect(stateAfterCopy.cards.value).toHaveLength(2);
    const copiedCard = stateAfterCopy.cards.value[1];
    expect(copiedCard.id).toBeDefined();
    expect(copiedCard.title).toBe(card.title);
    expect(copiedCard.description).toBe(card.description);
    expect(copiedCard.listId).toBe("2");
    expect(copiedCard.tags).toStrictEqual(card.tags);
    expect(copiedCard.attachments).toStrictEqual(card.attachments);
    expect(stateAfterCopy.modalActionMenusVisibility.value.copyMenuOpen).toBeFalsy();
  });
});
