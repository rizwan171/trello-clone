import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../app/store";
import AttachmentEditMenu from "../../../../components/CardModal/CardModalAttachments/AttachmentEditMenu";
import { renderWithProviders } from "../../../utils/renderUtils";
import { generateModalActionsVisibilityState } from "../../../utils/stateUtils";

describe("AttatchmentEditMenu", () => {
  let initialState: Partial<RootState>;
  let fileId: string;
  let fileName: string;

  beforeEach(() => {
    fileId = "fileId";
    fileName = "Test File Name";

    const card = {
      id: "1",
      title: "Card 1",
      description: "Description",
      listId: "1",
      tags: [],
      attachments: [{ id: fileId, name: fileName, date: new Date().toString() }],
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
          attachmentEditMenuOpen: {
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
    const view = renderWithProviders(<AttachmentEditMenu fileId={fileId} fileName={fileName} />, {
      preloadedState: initialState,
    });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should edit the attachment name", () => {
    const { store } = renderWithProviders(<AttachmentEditMenu fileId={fileId} fileName={fileName} />, {
      preloadedState: initialState,
    });
    expect(store.getState().cards.value[0].attachments).toHaveLength(1);
    expect(store.getState().cards.value[0].attachments[0].name).toBe(fileName);
    expect(store.getState().currentSelectedCard.value?.attachments).toHaveLength(1);
    expect(store.getState().currentSelectedCard.value?.attachments[0].name).toBe(fileName);
    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.status).toBeTruthy();

    const editInput = screen.getByTestId("attachment-edit-menu-input") as HTMLInputElement;
    expect(editInput).toBeInTheDocument();

    const updatedNameString = "Updated Name";
    fireEvent.change(editInput, { target: { value: updatedNameString } });

    const updateButton = screen.getByText("Update") as HTMLButtonElement;
    expect(updateButton).toBeInTheDocument();

    fireEvent.click(updateButton);

    expect(store.getState().cards.value[0].attachments[0].name).toBe(updatedNameString);
    expect(store.getState().currentSelectedCard.value?.attachments[0].name).toBe(updatedNameString);
    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.id).toBe(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.status).toBeFalsy();
  });

  it("should close the edit attachment menu", () => {
    const { store } = renderWithProviders(<AttachmentEditMenu fileId={fileId} fileName={fileName} />, {
      preloadedState: initialState,
    });
    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.status).toBeTruthy();

    const closeIcon = screen.getByTestId("attachment-edit-menu-close");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.id).toBe(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.status).toBeFalsy();
  });
});
