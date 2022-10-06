import { fireEvent, screen, waitFor } from "@testing-library/react";
import localforage from "localforage";
import { RootState } from "../../../../../app/store";
import AttachmentMenu from "../../../../../components/CardModal/CardModalActions/AttachmentMenu/AttachmentMenu";
import { renderWithProviders } from "../../../../utils/renderUtils";
import { generateModalActionsVisibilityState } from "../../../../utils/stateUtils";

describe("AttachmentMenu", () => {
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
            listId: "list-id-1",
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
          listId: "list-id-1",
          tags: [],
          attachments: [],
        },
      },
      modalActionMenusVisibility: {
        value: {
          ...modalActionsVisibilityState.value,
          attachmentMenuOpen: {
            id: 0,
            status: true,
          },
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should render successfully with update true", () => {
    const view = renderWithProviders(<AttachmentMenu update={true} />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with update false", () => {
    const view = renderWithProviders(<AttachmentMenu update={false} />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should close menu", () => {
    const { store } = renderWithProviders(<AttachmentMenu update={false} />, { preloadedState: initialState });

    const closeIcon = screen.getByTestId("attachment-menu-close") as HTMLElement;
    expect(closeIcon).toBeInTheDocument();

    const stateBeforeCloseClick = store.getState();
    expect(stateBeforeCloseClick.modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeTruthy();

    fireEvent.click(closeIcon);

    const stateAfterCloseClick = store.getState();
    expect(stateAfterCloseClick.modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeFalsy();
  });

  it("should click the hidden input element", () => {
    renderWithProviders(<AttachmentMenu update={false} />, { preloadedState: initialState });

    const uploadButton = screen.getByText("Upload from computer") as HTMLButtonElement;
    const hiddenFileInput = screen.getByTestId("attachment-menu-file-upload") as HTMLInputElement;
    expect(uploadButton).toBeInTheDocument();
    expect(hiddenFileInput).toBeInTheDocument();

    jest.spyOn(hiddenFileInput, "click");
    fireEvent.click(uploadButton);

    expect(hiddenFileInput.click).toHaveBeenCalled();
  });

  it("should save a single uploaded file successfully", async () => {
    const { store } = renderWithProviders(<AttachmentMenu update={false} />, { preloadedState: initialState });

    const stateBeforeUpload = store.getState();
    expect(stateBeforeUpload.currentSelectedCard.value?.attachments).toHaveLength(0);
    expect(stateBeforeUpload.modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeTruthy();

    const hiddenFileInput = screen.getByTestId("attachment-menu-file-upload") as HTMLInputElement;
    expect(hiddenFileInput).toBeInTheDocument();

    const uploadedFile = new File(["This is a test file"], "test.txt", { type: "text/plain" });
    const date = new Date();
    jest.useFakeTimers().setSystemTime(date);

    localforage.setItem = jest.fn();

    fireEvent.change(hiddenFileInput, { target: { files: [uploadedFile] } });

    await waitFor(() => {
      expect(store.getState()).not.toEqual(stateBeforeUpload);
    });

    const stateAfterUpdate = store.getState();
    const selectedCardAfterUpdate = stateAfterUpdate.currentSelectedCard.value;
    expect(localforage.setItem).toHaveBeenCalled();
    expect(selectedCardAfterUpdate?.attachments).toHaveLength(1);
    expect(selectedCardAfterUpdate?.attachments[0].id).toBeDefined();
    expect(selectedCardAfterUpdate?.attachments[0].name).toBe(uploadedFile.name);
    expect(selectedCardAfterUpdate?.attachments[0].date).toBe(JSON.stringify(date));
    expect(stateAfterUpdate.modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeFalsy();
  });

  it("should save multiple uploaded files successfully", async () => {
    const { store } = renderWithProviders(<AttachmentMenu update={false} />, { preloadedState: initialState });

    const stateBeforeUpload = store.getState();
    expect(stateBeforeUpload.currentSelectedCard.value?.attachments).toHaveLength(0);
    expect(stateBeforeUpload.modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeTruthy();

    const hiddenFileInput = screen.getByTestId("attachment-menu-file-upload") as HTMLInputElement;
    expect(hiddenFileInput).toBeInTheDocument();

    const uploadedFile1 = new File(["This is a test file 1"], "test1.txt", { type: "text/plain" });
    const uploadedFile2 = new File(["This is a test file 2 "], "test2.txt", { type: "text/plain" });
    const uploadedFile3 = new File(["This is a test file 3"], "test3.txt", { type: "text/plain" });
    const uploadedFiles = [uploadedFile1, uploadedFile2, uploadedFile3];
    const date = new Date();
    jest.useFakeTimers().setSystemTime(date);

    localforage.setItem = jest.fn();

    fireEvent.change(hiddenFileInput, { target: { files: [...uploadedFiles] } });

    await waitFor(() => {
      expect(store.getState()).not.toEqual(stateBeforeUpload);
    });

    const stateAfterUpdate = store.getState();
    const selectedCardAfterUpdate = stateAfterUpdate.currentSelectedCard.value;
    expect(localforage.setItem).toHaveBeenCalledTimes(3);
    expect(selectedCardAfterUpdate?.attachments).toHaveLength(3);
    selectedCardAfterUpdate?.attachments.forEach((attachment, index) => {
      expect(attachment.id).toBeDefined();
      expect(attachment.name).toBe(uploadedFiles[index].name);
      expect(attachment.date).toBe(JSON.stringify(date));
    });
    expect(stateAfterUpdate.modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeFalsy();
  });
});
