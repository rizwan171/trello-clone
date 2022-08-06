import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../../app/store";
import DeleteMenu from "../../../../../components/CardModal/CardModalActions/DeleteMenu/DeleteMenu";
import { renderWithProviders } from "../../../../utils/renderUtils";
import { generateModalActionsVisibilityState } from "../../../../utils/stateUtils";

describe("DeleteMenu", () => {
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
          deleteMenuOpen: true,
        },
      },
    };
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<DeleteMenu />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should close delete menu", () => {
    const { store } = renderWithProviders(<DeleteMenu />, { preloadedState: initialState });
    const stateBeforeClose = store.getState();
    expect(stateBeforeClose.modalActionMenusVisibility.value.deleteMenuOpen).toBeTruthy();

    const closeIcon = screen.getByTestId("close-icon");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    const stateAfterClose = store.getState();
    expect(stateAfterClose.modalActionMenusVisibility.value.deleteMenuOpen).toBeFalsy();
  });

  it("should delete card", async () => {
    const { store } = renderWithProviders(<DeleteMenu />, { preloadedState: initialState });
    const stateBeforeDelete = store.getState();
    expect(stateBeforeDelete.modalActionMenusVisibility.value.deleteMenuOpen).toBeTruthy();
    expect(stateBeforeDelete.cards.value).toHaveLength(1);
    expect(stateBeforeDelete.currentSelectedCard.value).not.toBeNull();

    const deleteButton = screen.getByText("Delete") as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    const stateAfterDelete = store.getState();
    expect(stateAfterDelete.cards.value).toHaveLength(0);
    expect(stateAfterDelete.currentSelectedCard.value).toBeNull();
    expect(stateAfterDelete.modalActionMenusVisibility.value.deleteMenuOpen).toBeFalsy();
  });
});
