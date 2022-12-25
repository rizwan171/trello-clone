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

  it("should add a card", () => {
    const { store } = renderWithProviders(<AddCardForm setOpen={mockSetOpen} listId={"1"} />, {
      preloadedState: initialState,
    });
    expect(store.getState().cards.value).toHaveLength(0);

    const addCardInput = screen.getByTestId("add-card-input") as HTMLInputElement;
    expect(addCardInput).toBeInTheDocument();

    fireEvent.change(addCardInput, { target: { value: "New Card" } });

    const addCardButton = screen.getByText("Add Card") as HTMLButtonElement;
    expect(addCardButton).toBeInTheDocument();

    fireEvent.click(addCardButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(store.getState().cards.value).toHaveLength(1);
    expect(store.getState().cards.value[0].title).toBe("New Card");
    expect(store.getState().cards.value[0].listId).toBe("1");
  });

  it("should close the add card form", () => {
    renderWithProviders(<AddCardForm setOpen={mockSetOpen} listId={"1"} />, {
      preloadedState: initialState,
    });

    const closeButton = screen.getByTestId("add-card-close");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
