import { fireEvent, screen, within } from "@testing-library/react";
import { RootState } from "../../../../../app/store";
import TagsMenu from "../../../../../components/CardModal/CardModalActions/TagsMenu/TagsMenu";
import { renderWithProviders } from "../../../../utils/renderUtils";
import { generateModalActionsVisibilityState } from "../../../../utils/stateUtils";

describe("TagsMenu", () => {
  let initialState: Partial<RootState>;

  beforeEach(() => {
    const modalActionsVisibilityState = generateModalActionsVisibilityState();
    initialState = {
      tags: {
        value: [
          {
            id: "1",
            name: "Selected Tag",
            colour: "#000000",
          },
          {
            id: "2",
            name: "Unique Title",
            colour: "#000000",
          },
          {
            id: "3",
            name: "Similarly Named Tag 1",
            colour: "#000000",
          },
          {
            id: "4",
            name: "Similarly Named Tag 2",
            colour: "#000000",
          },
        ],
      },
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
      createTagMenuData: {
        value: null,
      },
      modalActionMenusVisibility: {
        value: {
          ...modalActionsVisibilityState.value,
          tagsMenuOpen: true,
        },
      },
    };
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<TagsMenu />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should open the create tag menu to add a new tag", () => {
    const { store } = renderWithProviders(<TagsMenu />, { preloadedState: initialState });
    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeFalsy();

    const createTagButton = screen.getByText("Create a new tag") as HTMLButtonElement;
    expect(createTagButton).toBeInTheDocument();

    fireEvent.click(createTagButton);

    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeTruthy();
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeFalsy();
    expect(store.getState().createTagMenuData.value).toBeNull();
  });

  it("should open the create tag menu to edit an existing tag", () => {
    const { store } = renderWithProviders(<TagsMenu />, { preloadedState: initialState });
    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeFalsy();

    const editIcon = screen.getAllByTestId("edit-icon")[0] as HTMLElement;
    expect(editIcon).toBeInTheDocument();

    fireEvent.click(editIcon);

    expect(store.getState().modalActionMenusVisibility.value.createTagsMenuOpen).toBeTruthy();
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeFalsy();
    expect(store.getState().createTagMenuData.value?.id).toBe("1");
    expect(store.getState().createTagMenuData.value?.name).toBe("Selected Tag");
    expect(store.getState().createTagMenuData.value?.colour).toBe("#000000");
  });

  it("should update search results with all tags that match the search query", () => {
    renderWithProviders(<TagsMenu />, { preloadedState: initialState });

    const tagOptions = screen.getAllByTestId("tag-option-inner-container");
    expect(tagOptions).toHaveLength(4);

    const tagSearchInput = screen.getByTestId("tag-search") as HTMLInputElement;
    expect(tagSearchInput).toBeInTheDocument();

    fireEvent.change(tagSearchInput, { target: { value: "Similar" } });

    const searchResults = screen.getAllByTestId("tag-option-inner-container");
    expect(searchResults).toHaveLength(2);
    expect(within(searchResults[0]).getByTestId("tag-option-name")).toHaveTextContent("Similarly Named Tag 1");
    expect(within(searchResults[1]).getByTestId("tag-option-name")).toHaveTextContent("Similarly Named Tag 2");
  });

  it("should update search results with just the tag being searched for", () => {
    const { rerender } = renderWithProviders(<TagsMenu />, { preloadedState: initialState });

    const tagOptions = screen.getAllByTestId("tag-option-inner-container");
    expect(tagOptions).toHaveLength(4);

    const tagSearchInput = screen.getByTestId("tag-search") as HTMLInputElement;
    expect(tagSearchInput).toBeInTheDocument();

    fireEvent.change(tagSearchInput, { target: { value: "Unique Title" } });

    rerender(<TagsMenu />);
    const searchResults = screen.getAllByTestId("tag-option-inner-container");
    expect(searchResults).toHaveLength(1);
    expect(within(searchResults[0]).getByTestId("tag-option-name")).toHaveTextContent("Unique Title");
  });

  it("should update search results with no results", () => {
    const { rerender } = renderWithProviders(<TagsMenu />, { preloadedState: initialState });

    const tagOptions = screen.getAllByTestId("tag-option-inner-container");
    expect(tagOptions).toHaveLength(4);

    const tagSearchInput = screen.getByTestId("tag-search") as HTMLInputElement;
    expect(tagSearchInput).toBeInTheDocument();

    fireEvent.change(tagSearchInput, { target: { value: "Non Existent" } });

    rerender(<TagsMenu />);
    expect(screen.queryAllByTestId("tag-option-inner-container")).toHaveLength(0);
  });

  it("should close the tags menu", () => {
    const { store } = renderWithProviders(<TagsMenu />, { preloadedState: initialState });
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeTruthy();

    const closeTagsMenuIcon = screen.getByTestId("close-tags-menu-icon");
    expect(closeTagsMenuIcon).toBeInTheDocument();

    fireEvent.click(closeTagsMenuIcon);

    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeFalsy();
  });

  it("should add the tag clicked to the card", () => {
    const { store, rerender } = renderWithProviders(<TagsMenu />, { preloadedState: initialState });
    expect(store.getState().currentSelectedCard.value?.tags).toHaveLength(1);
    expect(store.getState().currentSelectedCard.value?.tags[0]).toBe("1");
    expect(store.getState().cards.value[0].tags).toHaveLength(1);
    expect(store.getState().cards.value[0].tags[0]).toBe("1");

    const unselectedTag = screen.getAllByTestId("tag-option-inner-container")[1];
    expect(unselectedTag).toBeInTheDocument();
    expect(within(unselectedTag).getByTestId("tag-option-name")).toHaveTextContent("Unique Title");
    expect(within(unselectedTag).queryByTestId("tag-selected-icon")).not.toBeInTheDocument();

    fireEvent.click(unselectedTag);
    expect(store.getState().currentSelectedCard.value?.tags).toHaveLength(2);
    expect(store.getState().currentSelectedCard.value?.tags[1]).toBe("2");
    expect(store.getState().cards.value[0].tags).toHaveLength(2);
    expect(store.getState().cards.value[0].tags[1]).toBe("2");

    rerender(<TagsMenu />);
    const nowSelectedTag = screen.getAllByTestId("tag-option-inner-container")[1];
    expect(nowSelectedTag).toBeInTheDocument();
    expect(within(nowSelectedTag).getByTestId("tag-option-name")).toHaveTextContent("Unique Title");
    expect(within(nowSelectedTag).getByTestId("tag-selected-icon")).toBeInTheDocument();
  });

  it("should remove the tag clicked from the card", () => {
    const { store, rerender } = renderWithProviders(<TagsMenu />, { preloadedState: initialState });
    expect(store.getState().currentSelectedCard.value?.tags).toHaveLength(1);
    expect(store.getState().currentSelectedCard.value?.tags[0]).toBe("1");
    expect(store.getState().cards.value[0].tags).toHaveLength(1);
    expect(store.getState().cards.value[0].tags[0]).toBe("1");

    const unselectedTag = screen.getAllByTestId("tag-option-inner-container")[0];
    expect(unselectedTag).toBeInTheDocument();
    expect(within(unselectedTag).getByTestId("tag-option-name")).toHaveTextContent("Selected Tag");
    expect(within(unselectedTag).getByTestId("tag-selected-icon")).toBeInTheDocument();

    fireEvent.click(unselectedTag);
    expect(store.getState().currentSelectedCard.value?.tags).toHaveLength(0);
    expect(store.getState().cards.value[0].tags).toHaveLength(0);

    rerender(<TagsMenu />);
    const nowSelectedTag = screen.getAllByTestId("tag-option-inner-container")[0];
    expect(nowSelectedTag).toBeInTheDocument();
    expect(within(nowSelectedTag).getByTestId("tag-option-name")).toHaveTextContent("Selected Tag");
    expect(within(nowSelectedTag).queryByTestId("tag-selected-icon")).not.toBeInTheDocument();
  });
});
