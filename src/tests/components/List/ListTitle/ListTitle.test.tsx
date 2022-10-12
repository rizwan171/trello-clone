import { fireEvent, screen, waitFor } from "@testing-library/react";
import { RootState } from "../../../../app/store";
import ListTitle from "../../../../components/List/ListTitle/ListTitle";
import List from "../../../../types/global/List";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("ListTitle", () => {
  let initialState: Partial<RootState>;
  let list: List;

  beforeEach(() => {
    list = {
      id: "1",
      title: "List 1",
    };

    initialState = {
      lists: {
        value: [
          {
            ...list,
          },
        ],
      },
      currentSelectedList: {
        value: null,
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<ListTitle listId={list.id} />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should update title on enter press", async () => {
    const { store } = renderWithProviders(<ListTitle listId={list.id} />, { preloadedState: initialState });
    expect(store.getState().lists.value[0].title).toBe(list.title);

    const titleHeading = screen.getByText(list.title) as HTMLHeadingElement;
    expect(titleHeading).toBeInTheDocument();

    fireEvent.click(titleHeading);

    const editableTitleInput = screen.getByTestId("list-title-editable-textarea") as HTMLTextAreaElement;
    expect(editableTitleInput).toBeInTheDocument();
    expect(titleHeading).not.toBeInTheDocument();

    const updatedTitle = "Updated Title";
    fireEvent.change(editableTitleInput, { target: { value: updatedTitle } });
    fireEvent.keyDown(editableTitleInput, { key: "Enter" });

    const updatedTitleHeading = screen.getByText(updatedTitle) as HTMLHeadingElement;
    expect(updatedTitleHeading).toBeInTheDocument();
    expect(editableTitleInput).not.toBeInTheDocument();
    expect(store.getState().lists.value[0].title).toBe(updatedTitle);
  });

  it("should not update title on blur", () => {
    const { store } = renderWithProviders(<ListTitle listId={list.id} />, {
      preloadedState: initialState,
    });
    expect(store.getState().lists.value[0].title).toBe(list.title);

    let titleHeading = screen.getByText(list.title) as HTMLHeadingElement;
    expect(titleHeading).toBeInTheDocument();

    fireEvent.click(titleHeading);

    const editableTitleInput = screen.getByTestId("list-title-editable-textarea") as HTMLTextAreaElement;
    expect(editableTitleInput).toBeInTheDocument();
    expect(titleHeading).not.toBeInTheDocument();

    const updatedTitle = "Updated Title";
    fireEvent.change(editableTitleInput, { target: { value: updatedTitle } });

    fireEvent.blur(editableTitleInput);

    // need to get the element again after rerender caused by onblur
    titleHeading = screen.getByText(list.title) as HTMLHeadingElement;

    expect(titleHeading).toBeInTheDocument();
    expect(titleHeading.textContent).toBe(list.title);
    expect(editableTitleInput).not.toBeInTheDocument();
    expect(store.getState().lists.value[0].title).toBe(list.title);
  });

  it("should open list options menu", () => {
    const { store } = renderWithProviders(<ListTitle listId={list.id} />, { preloadedState: initialState });
    expect(store.getState().currentSelectedList.value).toBeNull();

    const moreMenuButton = screen.getByTestId("list-title-more-menu-button");
    expect(moreMenuButton).toBeInTheDocument();

    fireEvent.click(moreMenuButton);

    expect(store.getState().currentSelectedList.value).toEqual(list);
  });
});
