import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../../../app/store";
import CreateTagMenu from "../../../../../../components/CardModal/CardModalActions/TagsMenu/CreateTagMenu/CreateTagMenu";
import { NO_COLOUR } from "../../../../../../constants/TagColours";
import { renderWithProviders } from "../../../../../utils/renderUtils";
import { generateModalActionsVisibilityState } from "../../../../../utils/stateUtils";

describe("CreateTagMenu", () => {
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
            attachments: [],
            tags: ["1"],
          },
        ],
      },
      currentSelectedCard: {
        value: {
          id: "1",
          title: "Test Card",
          description: "Test Description",
          listId: "1",
          attachments: [],
          tags: ["1"],
        },
      },
      selectedTagColour: {
        value: "#000000",
      },
      createTagMenuData: {
        value: null,
      },
      tags: {
        value: [
          {
            id: "1",
            name: "Test Tag",
            colour: "#EEEEEE",
          },
        ],
      },
      modalActionMenusVisibility: {
        value: {
          ...modalActionsVisibilityState.value,
          createTagsMenuOpen: true,
        },
      },
    };
  });

  it("should render successfully for creating a new tag", () => {
    const view = renderWithProviders(<CreateTagMenu />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully for editing an existing tag", () => {
    const editTagState = {
      ...initialState,
      createTagMenuData: {
        value: {
          id: "1",
          name: "Test Tag",
          colour: "#EEEEEE",
        },
      },
    };
    const view = renderWithProviders(<CreateTagMenu />, { preloadedState: editTagState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should select no colour", () => {
    const { store } = renderWithProviders(<CreateTagMenu />, { preloadedState: initialState });
    expect(store.getState().selectedTagColour.value).not.toBe(NO_COLOUR);

    const noColourOption = screen.getByTestId("no-colour-option") as HTMLDivElement;
    expect(noColourOption).toBeInTheDocument();

    fireEvent.click(noColourOption);

    expect(store.getState().selectedTagColour.value).toBe(NO_COLOUR);
  });

  it("should create a new tag", () => {
    const { store } = renderWithProviders(<CreateTagMenu />, { preloadedState: initialState });
    expect(store.getState().tags.value).toHaveLength(1);

    const tagNameInput = screen.getByTestId("tag-name-input") as HTMLInputElement;
    expect(tagNameInput).toBeInTheDocument();

    fireEvent.change(tagNameInput, { target: { value: "New Test Tag 2" } });

    const createButton = screen.getByText("Create") as HTMLButtonElement;
    expect(createButton).toBeInTheDocument();

    fireEvent.click(createButton);

    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeFalsy();
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeTruthy();
    expect(store.getState().tags.value).toHaveLength(2);
    expect(store.getState().tags.value[1].name).toBe("New Test Tag 2");
    expect(store.getState().tags.value[1].colour).toBe("#000000");
  });

  it("should update the existing tag", () => {
    const editTagState = {
      ...initialState,
      createTagMenuData: {
        value: {
          id: "1",
          name: "Test Tag",
          colour: "#EEEEEE",
        },
      },
    };
    const { store } = renderWithProviders(<CreateTagMenu />, { preloadedState: editTagState });
    expect(store.getState().tags.value).toHaveLength(1);

    const tagNameInput = screen.getByTestId("tag-name-input") as HTMLInputElement;
    expect(tagNameInput).toBeInTheDocument();

    fireEvent.change(tagNameInput, { target: { value: "Updated Test Tag 1" } });

    const update = screen.getByText("Update") as HTMLButtonElement;
    expect(update).toBeInTheDocument();

    fireEvent.click(update);

    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeFalsy();
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeTruthy();
    expect(store.getState().tags.value).toHaveLength(1);
    expect(store.getState().tags.value[0].name).toBe("Updated Test Tag 1");
    expect(store.getState().tags.value[0].colour).toBe("#EEEEEE");
  });

  it("should delete the existing tag", () => {
    const editTagState = {
      ...initialState,
      createTagMenuData: {
        value: {
          id: "1",
          name: "Test Tag",
          colour: "#EEEEEE",
        },
      },
    };
    const { store } = renderWithProviders(<CreateTagMenu />, { preloadedState: editTagState });
    expect(store.getState().tags.value).toHaveLength(1);

    const deleteButton = screen.getByText("Delete") as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    expect(store.getState().tags.value).toHaveLength(0);
    store.getState().cards.value.map((card) => expect(card.tags).not.toContain("1"));
    expect(store.getState().currentSelectedCard.value?.tags).not.toContain("1");
    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeFalsy();
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeTruthy();
  });

  it("should close menu", () => {
    const { store } = renderWithProviders(<CreateTagMenu />, { preloadedState: initialState });
    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeTruthy();

    const closeIcon = screen.getByTestId("close-icon") as HTMLElement;
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeFalsy();
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeFalsy();
  });

  it("should go back to TagsMenu", () => {
    const { store } = renderWithProviders(<CreateTagMenu />, { preloadedState: initialState });
    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeTruthy();

    const backIcon = screen.getByTestId("back-icon") as HTMLElement;
    expect(backIcon).toBeInTheDocument();

    fireEvent.click(backIcon);

    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeFalsy();
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeTruthy();
  });
});
