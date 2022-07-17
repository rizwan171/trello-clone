import { fireEvent, screen } from "@testing-library/react";
import AddTag from "../../../../components/CardModal/AddTag/AddTag";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("AddTag", () => {
  it("should render successfully", () => {
    const view = renderWithProviders(<AddTag />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should show tags menu", () => {
    const { store } = renderWithProviders(<AddTag />);
    const addTagButton = screen.getByRole("button") as HTMLButtonElement;
    expect(addTagButton).toBeInTheDocument();

    const stateBeforeButtonClick = store.getState();
    expect(stateBeforeButtonClick.modalActionMenusVisibility.value.tagsMenuOpen).toBeFalsy();

    fireEvent.click(addTagButton);

    const stateAfterButtonClick = store.getState();
    expect(stateAfterButtonClick.modalActionMenusVisibility.value.tagsMenuOpen).toBeTruthy();
  });
});
