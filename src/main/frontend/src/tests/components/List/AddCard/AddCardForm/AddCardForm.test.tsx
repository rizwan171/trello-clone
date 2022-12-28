import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../../app/store";
import AddCardForm from "../../../../../components/List/AddCard/AddCardForm/AddCardForm";
import { renderWithProviders } from "../../../../utils/renderUtils";

describe("AddCardForm", () => {
  let initialState: Partial<RootState>;
  let mockScrollIntoView: jest.Mock;
  let mockSetOpen: jest.Mock;

  beforeEach(() => {
    mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    mockSetOpen = jest.fn();

    initialState = {
      lists: {
        value: [
          {
            id: "1",
            title: "List 1",
          },
        ],
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<AddCardForm setOpen={mockSetOpen} listId={"1"} />, {
      preloadedState: initialState,
    });
    expect(mockScrollIntoView).toHaveBeenCalled();
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should add a card and close form when add button is clicked", () => {
    const { store } = renderWithProviders(<AddCardForm setOpen={mockSetOpen} listId={"1"} />, {
      preloadedState: initialState,
    });
    expect(store.getState().cards.value).toHaveLength(0);

    const addCardTextArea = screen.getByTestId("add-card-input") as HTMLTextAreaElement;
    expect(addCardTextArea).toBeInTheDocument();

    fireEvent.change(addCardTextArea, { target: { value: "New Card" } });

    const addCardButton = screen.getByText("Add Card") as HTMLButtonElement;
    expect(addCardButton).toBeInTheDocument();

    fireEvent.click(addCardButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(store.getState().cards.value).toHaveLength(1);
    expect(store.getState().cards.value[0].title).toBe("New Card");
    expect(store.getState().cards.value[0].listId).toBe("1");
  });

  it("should add a card and not close form when enter is pressed", () => {
    const { store } = renderWithProviders(<AddCardForm setOpen={mockSetOpen} listId={"1"} />, {
      preloadedState: initialState,
    });
    expect(store.getState().cards.value).toHaveLength(0);

    const addCardTextArea = screen.getByTestId("add-card-input") as HTMLTextAreaElement;
    expect(addCardTextArea).toBeInTheDocument();

    fireEvent.change(addCardTextArea, { target: { value: "New Card" } });
    fireEvent.keyDown(addCardTextArea, { key: "Enter" });

    expect(mockSetOpen).not.toHaveBeenCalledWith(false);
    expect(store.getState().cards.value).toHaveLength(1);
    expect(store.getState().cards.value[0].title).toBe("New Card");
    expect(store.getState().cards.value[0].listId).toBe("1");
  });

  it("should close the add card form when the close button is clicked", () => {
    renderWithProviders(<AddCardForm setOpen={mockSetOpen} listId={"1"} />, {
      preloadedState: initialState,
    });

    const closeButton = screen.getByTestId("add-card-close");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("should close the add card form when escape is pressed", () => {
    renderWithProviders(<AddCardForm setOpen={mockSetOpen} listId={"1"} />, {
      preloadedState: initialState,
    });

    const addCardTextArea = screen.getByTestId("add-card-input") as HTMLTextAreaElement;
    expect(addCardTextArea).toBeInTheDocument();

    fireEvent.keyDown(addCardTextArea, { key: "Escape" });

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
