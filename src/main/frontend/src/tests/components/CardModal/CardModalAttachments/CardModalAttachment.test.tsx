import { fireEvent, screen, waitFor } from "@testing-library/react";
import localforage from "localforage";
import { RootState } from "../../../../app/store";
import CardModalAttachment from "../../../../components/CardModal/CardModalAttachments/CardModalAttachment";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("CardModalAttachment", () => {
  let initialState: Partial<RootState>;

  beforeEach(() => {
    localforage.getItem = jest
      .fn()
      .mockReturnValueOnce(new File(["This is a test file"], "attachment1.txt", { type: "text/plain" }))
      .mockReturnValueOnce(new File(["This is another test file"], "attachment2.png", { type: "image/png" }));

    global.URL.createObjectURL = jest.fn().mockReturnValueOnce("attachment1.txt").mockReturnValueOnce("attachment2.png");

    // mocking random to provide a consistent value for randomInt() in CardModalAttachment.tsx.
    // this is used to determine the background colour of an attachment, and needs to be consistent
    // for the snapshot test.
    global.Math.random = jest.fn().mockReturnValue(0);

    initialState = {
      currentSelectedCard: {
        value: {
          id: "1",
          title: "Test Card",
          description: "Test Card Description",
          listId: "1",
          tags: [],
          attachments: [
            {
              id: "1",
              name: "attachment1.txt",
              date: new Date().toISOString(),
            },
            {
              id: "2",
              name: "attachment2.png",
              date: new Date().toISOString(),
            },
          ],
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", async () => {
    const view = renderWithProviders(<CardModalAttachment />, { preloadedState: initialState });

    await waitFor(() => screen.findByText("attachment1.txt"));

    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should show attachment delete modal", async () => {
    const { store } = renderWithProviders(<CardModalAttachment />, { preloadedState: initialState });
    await waitFor(() => screen.findByText("attachment1.txt"));
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.id).toBe(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.status).toBeFalsy();

    const deleteLink = screen.getAllByText("Delete")[0] as HTMLSpanElement;
    expect(deleteLink).toBeInTheDocument();

    fireEvent.click(deleteLink);

    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.id).toBe("1");
    expect(store.getState().modalActionMenusVisibility.value.attachmentDeleteMenuOpen.status).toBeTruthy();
  });

  it("should show attachment edit modal", async () => {
    const { store } = renderWithProviders(<CardModalAttachment />, { preloadedState: initialState });
    await waitFor(() => screen.findByText("attachment1.txt"));
    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.id).toBe(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.status).toBeFalsy();

    const editLink = screen.getAllByText("Edit")[0] as HTMLSpanElement;
    expect(editLink).toBeInTheDocument();

    fireEvent.click(editLink);

    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.id).toBe("1");
    expect(store.getState().modalActionMenusVisibility.value.attachmentEditMenuOpen.status).toBeTruthy();
  });

  it("should show attachment menu modal", async () => {
    const { store } = renderWithProviders(<CardModalAttachment />, { preloadedState: initialState });
    await waitFor(() => screen.findByText("attachment1.txt"));
    expect(store.getState().modalActionMenusVisibility.value.attachmentMenuOpen.id).toBe(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeFalsy();

    const addAttachmentButton = screen.getByText("Add an attachment") as HTMLButtonElement;
    expect(addAttachmentButton).toBeInTheDocument();

    fireEvent.click(addAttachmentButton);

    expect(store.getState().modalActionMenusVisibility.value.attachmentMenuOpen.id).toBe(2);
    expect(store.getState().modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeTruthy();
  });
});
