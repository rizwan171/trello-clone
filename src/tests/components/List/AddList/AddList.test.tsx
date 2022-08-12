import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../app/store";
import AddList from "../../../../components/List/AddList/AddList";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("AddList", () => {
  let initialState: Partial<RootState>;
  let mockScrollIntoView: jest.Mock;

  beforeEach(() => {
    initialState = {
      lists: {
        value: [],
      },
    };

    mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully when rendered, opened, and closed", () => {
    const { rerender, asFragment } = renderWithProviders(<AddList />, { preloadedState: initialState });
    expect(asFragment()).toMatchSnapshot();

    const addAListButton = screen.getByText("Add a list") as HTMLButtonElement;
    expect(addAListButton).toBeInTheDocument();

    fireEvent.click(addAListButton);

    expect(mockScrollIntoView).toHaveBeenCalled();

    rerender(<AddList />);
    expect(asFragment()).toMatchSnapshot();

    const closeIcon = screen.getByTestId("add-list-close-icon");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    rerender(<AddList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should add a list when submit button pressed", () => {
    const { store } = renderWithProviders(<AddList />, { preloadedState: initialState });
    expect(store.getState().lists.value).toHaveLength(0);

    const addAListButton = screen.getByText("Add a list") as HTMLButtonElement;
    expect(addAListButton).toBeInTheDocument();

    fireEvent.click(addAListButton);

    const listTitleInput = screen.getByTestId("add-list-title-input") as HTMLInputElement;
    expect(listTitleInput).toBeInTheDocument();

    fireEvent.change(listTitleInput, { target: { value: "List 1" } });

    const submitButton = screen.getByText("Add List") as HTMLButtonElement;
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    expect(store.getState().lists.value).toHaveLength(1);
    expect(store.getState().lists.value[0].id).toBeDefined();
    expect(store.getState().lists.value[0].title).toBe("List 1");
  });

  it("should add a list when enter pressed in the title input", () => {
    const { store } = renderWithProviders(<AddList />, { preloadedState: initialState });
    expect(store.getState().lists.value).toHaveLength(0);

    const addAListButton = screen.getByText("Add a list") as HTMLButtonElement;
    expect(addAListButton).toBeInTheDocument();

    fireEvent.click(addAListButton);

    const listTitleInput = screen.getByTestId("add-list-title-input") as HTMLInputElement;
    expect(listTitleInput).toBeInTheDocument();

    fireEvent.change(listTitleInput, { target: { value: "List 1" } });

    fireEvent.keyPress(listTitleInput, { key: "Enter", charCode: 13 });

    expect(store.getState().lists.value).toHaveLength(1);
    expect(store.getState().lists.value[0].id).toBeDefined();
    expect(store.getState().lists.value[0].title).toBe("List 1");
  });
});
