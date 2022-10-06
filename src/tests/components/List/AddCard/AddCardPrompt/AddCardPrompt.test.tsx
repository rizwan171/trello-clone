import { fireEvent, render, screen } from "@testing-library/react";
import AddCardPrompt from "../../../../../components/List/AddCard/AddCardPrompt/AddCardPrompt";

describe("AddCardPrompt", () => {
  let mockSetOpen: jest.Mock;

  beforeEach(() => {
    mockSetOpen = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully when open", () => {
    const view = render(<AddCardPrompt open={true} setOpen={mockSetOpen} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully when closed", () => {
    const view = render(<AddCardPrompt open={false} setOpen={mockSetOpen} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should open the add card form", () => {
    render(<AddCardPrompt open={true} setOpen={mockSetOpen} />);

    const addCardPromptContainer = screen.getByTestId("add-card-prompt-container") as HTMLDivElement;
    expect(addCardPromptContainer).toBeInTheDocument();

    fireEvent.click(addCardPromptContainer);

    expect(mockSetOpen).toHaveBeenCalledWith(true);
  });
});
