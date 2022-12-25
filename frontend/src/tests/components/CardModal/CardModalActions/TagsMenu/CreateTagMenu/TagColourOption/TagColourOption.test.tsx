import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../../../../app/store";
import TagColourOption from "../../../../../../../components/CardModal/CardModalActions/TagsMenu/CreateTagMenu/TagColourOption/TagColourOption";
import { renderWithProviders } from "../../../../../../utils/renderUtils";

describe("TagColourOption", () => {
  const SELECTED_TAG_COLOUR = "#86BA90";

  let initialState: Partial<RootState>;

  beforeEach(() => {
    initialState = {
      selectedTagColour: {
        value: SELECTED_TAG_COLOUR,
      },
    };
  });

  it("should render successfully for a selected tag", () => {
    const view = renderWithProviders(<TagColourOption colour={SELECTED_TAG_COLOUR} />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
    const container = screen.getByTestId("tag-colour-option-container") as HTMLDivElement;
    expect(container.className).toContain("ring-2 ring-trello-blue-100");
  });

  it("should render successfully for a non-selected tag", () => {
    const colour = "#FFFFFF";
    const view = renderWithProviders(<TagColourOption colour={colour} />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
    const container = screen.getByTestId("tag-colour-option-container") as HTMLDivElement;
    expect(container.className).not.toContain("ring-2 ring-trello-blue-100");
  });

  it("should select the tag on click", () => {
    const colour = "#FFFFFF";
    const { store } = renderWithProviders(<TagColourOption colour={colour} />, { preloadedState: initialState });
    const stateBeforeClick = store.getState();
    expect(stateBeforeClick.selectedTagColour.value).toBe(SELECTED_TAG_COLOUR);

    const container = screen.getByTestId("tag-colour-option-container") as HTMLDivElement;
    expect(container).toBeInTheDocument();

    fireEvent.click(container);

    const stateAfterClick = store.getState();
    expect(stateAfterClick.selectedTagColour.value).toBe(colour);
  });
});
