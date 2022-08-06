import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../app/store";
import BoardOptions from "../../../../components/NavBar/BoardOptions/BoardOptions";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("BoardOptions", () => {
  let initialState: Partial<RootState>;

  it("should render successfully for board closed", () => {
    initialState = {
      boardOptions: {
        value: false,
      },
    };

    const view = renderWithProviders(<BoardOptions />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();

    const boardOptionsButton = screen.getByText("Options") as HTMLButtonElement;
    expect(boardOptionsButton).toBeInTheDocument();
  });

  it("should render successfully for board open", () => {
    initialState = {
      boardOptions: {
        value: true,
      },
    };

    const view = renderWithProviders(<BoardOptions />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();

    const boardOptionsButton = screen.getByText("Close") as HTMLButtonElement;
    expect(boardOptionsButton).toBeInTheDocument();
  });

  it("should open the board options", () => {
    initialState = {
      boardOptions: {
        value: false,
      },
    };

    const { store } = renderWithProviders(<BoardOptions />, { preloadedState: initialState });
    const stateBeforeClick = store.getState();
    expect(stateBeforeClick.boardOptions.value).toBeFalsy();

    const boardOptionsButton = screen.getByText("Options") as HTMLButtonElement;
    expect(boardOptionsButton).toBeInTheDocument();

    fireEvent.click(boardOptionsButton);

    const stateAfterClick = store.getState();
    expect(stateAfterClick.boardOptions.value).toBeTruthy();
  });

  it("should close the board options", () => {
    initialState = {
      boardOptions: {
        value: true,
      },
    };

    const { store } = renderWithProviders(<BoardOptions />, { preloadedState: initialState });
    const stateBeforeClick = store.getState();
    expect(stateBeforeClick.boardOptions.value).toBeTruthy();

    const boardOptionsButton = screen.getByText("Close") as HTMLButtonElement;
    expect(boardOptionsButton).toBeInTheDocument();

    fireEvent.click(boardOptionsButton);

    const stateAfterClick = store.getState();
    expect(stateAfterClick.boardOptions.value).toBeFalsy();
  });
});
