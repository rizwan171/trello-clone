import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../app/store";
import BoardTitle from "../../../../components/NavBar/BoardTitle/BoardTitle";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("BoardTitle", () => {
  let initialState: Partial<RootState>;

  beforeEach(() => {
    initialState = {
      board: {
        value: {
          id: "1",
          title: "Test Board",
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<BoardTitle />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();

    const heading = screen.getByText("Test Board") as HTMLHeadingElement;
    expect(heading).toBeInTheDocument();
  });

  it("should render the input element for editing", () => {
    renderWithProviders(<BoardTitle />, { preloadedState: initialState });

    const heading = screen.getByText("Test Board") as HTMLHeadingElement;
    expect(heading).toBeInTheDocument();

    fireEvent.click(heading);

    const titleInput = screen.getByTestId("board-title-input") as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();
    expect(heading).not.toBeInTheDocument();
  });

  it("should update input size on focus", () => {
    renderWithProviders(<BoardTitle />, { preloadedState: initialState });

    const heading = screen.getByText("Test Board") as HTMLHeadingElement;
    expect(heading).toBeInTheDocument();

    fireEvent.click(heading);

    const titleInput = screen.getByTestId("board-title-input") as HTMLInputElement;

    const sizeBeforeFocus = titleInput.size;
    fireEvent.focus(titleInput, { target: { value: "More than 20 characters" } });

    const updatedTitleInput = screen.getByTestId("board-title-input") as HTMLInputElement;
    const sizeAfterFocus = updatedTitleInput.size;
    expect(sizeAfterFocus).not.toBe(sizeBeforeFocus);
  });

  it("should not update input size on focus", () => {
    renderWithProviders(<BoardTitle />, { preloadedState: initialState });

    const heading = screen.getByText("Test Board") as HTMLHeadingElement;
    expect(heading).toBeInTheDocument();

    fireEvent.click(heading);

    const titleInput = screen.getByTestId("board-title-input") as HTMLInputElement;

    const sizeBeforeFocus = titleInput.size;
    fireEvent.focus(titleInput, { target: { value: "Short text here" } });

    const updatedTitleInput = screen.getByTestId("board-title-input") as HTMLInputElement;
    const sizeAfterFocus = updatedTitleInput.size;
    expect(sizeAfterFocus).toBe(sizeBeforeFocus);
  });

  it("should update input size on change", () => {
    renderWithProviders(<BoardTitle />, { preloadedState: initialState });

    const heading = screen.getByText("Test Board") as HTMLHeadingElement;
    expect(heading).toBeInTheDocument();

    fireEvent.click(heading);

    const titleInput = screen.getByTestId("board-title-input") as HTMLInputElement;

    const sizeBeforeOnChange = titleInput.size;
    fireEvent.change(titleInput, { target: { value: "More than 20 characters" } });

    const updatedTitleInput = screen.getByTestId("board-title-input") as HTMLInputElement;
    const sizeAfterOnChange = updatedTitleInput.size;
    expect(sizeAfterOnChange).not.toBe(sizeBeforeOnChange);
  });

  it("should not update input size on change", () => {
    renderWithProviders(<BoardTitle />, { preloadedState: initialState });

    const heading = screen.getByText("Test Board") as HTMLHeadingElement;
    expect(heading).toBeInTheDocument();

    fireEvent.click(heading);

    const titleInput = screen.getByTestId("board-title-input") as HTMLInputElement;

    const sizeBeforeOnChange = titleInput.size;
    fireEvent.change(titleInput, { target: { value: "Short text here" } });

    const updatedTitleInput = screen.getByTestId("board-title-input") as HTMLInputElement;
    const sizeAfterOnChange = updatedTitleInput.size;
    expect(sizeAfterOnChange).toBe(sizeBeforeOnChange);
  });

  it("should not update board title", () => {
    const { store } = renderWithProviders(<BoardTitle />, { preloadedState: initialState });
    const stateBeforeUpdate = store.getState();
    expect(stateBeforeUpdate.board.value.title).toBe("Test Board");

    const heading = screen.getByText("Test Board") as HTMLHeadingElement;
    expect(heading).toBeInTheDocument();

    fireEvent.click(heading);

    const titleInput = screen.getByTestId("board-title-input") as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.blur(titleInput);

    const stateAfterUpdate = store.getState();
    expect(stateAfterUpdate.board.value.title).toBe("Test Board");
  });

  it("should update board title", () => {
    const { store } = renderWithProviders(<BoardTitle />, { preloadedState: initialState });
    const stateBeforeUpdate = store.getState();
    expect(stateBeforeUpdate.board.value.title).toBe("Test Board");

    const heading = screen.getByText("Test Board") as HTMLHeadingElement;
    expect(heading).toBeInTheDocument();

    fireEvent.click(heading);

    const titleInput = screen.getByTestId("board-title-input") as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.keyDown(titleInput, { key: "Enter" });

    const stateAfterUpdate = store.getState();
    expect(stateAfterUpdate.board.value.title).toBe("Updated Title");
    expect(titleInput).not.toBeInTheDocument();
    const updatedHeading = screen.getByText("Updated Title") as HTMLHeadingElement;
    expect(updatedHeading).toBeInTheDocument();
  });
});
