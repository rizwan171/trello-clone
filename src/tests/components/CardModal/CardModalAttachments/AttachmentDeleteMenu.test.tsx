import { fireEvent, screen } from "@testing-library/react";
import localforage from "localforage";
import { RootState } from "../../../../app/store";
import AttachmentDeleteMenu from "../../../../components/CardModal/CardModalAttachments/AttachmentDeleteMenu";
import { renderWithProviders } from "../../../utils/renderUtils";
import { generateModalActionsVisibilityState } from "../../../utils/stateUtils";

describe("AttachmentDeleteMenu", () => {
  let initialState: Partial<RootState>;
  let fileId: string;

  beforeEach(() => {
    fileId = "fileId";

    const card = {
      id: "1",
      title: "Card 1",
      description: "Description",
      listId: "1",
      tags: [],
      attachments: [{ id: fileId, name: "attachment1.txt", date: new Date().toString() }],
    };

    const modalActionsVisibilityState = generateModalActionsVisibilityState();

    initialState = {
      cards: {
        value: [{ ...card }],
      },
      currentSelectedCard: {
        value: { ...card },
      },
      modalActionMenusVisibility: {
        value: {
          ...modalActionsVisibilityState.value,
          attachmentDeleteMenuOpen: {
            id: 1,
            status: true,
          },
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<AttachmentDeleteMenu fileId={fileId} />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should delete card attachment", () => {
    localforage.removeItem = jest.fn();

    const { store } = renderWithProviders(<AttachmentDeleteMenu fileId={fileId} />, { preloadedState: initialState });
    expect(store.getState().cards.value[0].attachments).toHaveLength(1);
    expect(store.getState().cards.value[0].attachments[0].id).toBe(fileId);
    expect(store.getState().currentSelectedCard.value?.attachments).toHaveLength(1);
    expect(store.getState().currentSelectedCard.value?.attachments[0].id).toBe(fileId);
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.status).toBeTruthy();

    const deleteButton = screen.getByText("Delete") as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(localforage.removeItem).toHaveBeenCalledWith(fileId);
    expect(store.getState().cards.value[0].attachments).toHaveLength(0);
    expect(store.getState().currentSelectedCard.value?.attachments).toHaveLength(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.id).toBe(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.status).toBeFalsy();
  });

  it("should close delete attachment menu", () => {
    const { store } = renderWithProviders(<AttachmentDeleteMenu fileId={fileId} />, { preloadedState: initialState });
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.status).toBeTruthy();

    const closeIcon = screen.getByTestId("attachment-delete-menu-close");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.id).toBe(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.status).toBeFalsy();
  });
});
