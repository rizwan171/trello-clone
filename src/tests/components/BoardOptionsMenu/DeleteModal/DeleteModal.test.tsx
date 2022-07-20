import { fireEvent, render, screen } from "@testing-library/react";
import DeleteModal from "../../../../components/BoardOptionsMenu/DeleteModal/DeleteModal";

describe("DeleteModal", () => {
  let mockCloseDeleteFn: jest.Mock;
  let mockHandleDeleteBoardFn: jest.Mock;

  beforeEach(() => {
    mockCloseDeleteFn = jest.fn();
    mockHandleDeleteBoardFn = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const view = render(<DeleteModal closeDeleteModal={mockCloseDeleteFn} handleDeleteBoard={mockHandleDeleteBoardFn} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should call closeDeleteModal", () => {
    render(<DeleteModal closeDeleteModal={mockCloseDeleteFn} handleDeleteBoard={mockHandleDeleteBoardFn} />);
    const closeButton = screen.getByText("Cancel");
    fireEvent.click(closeButton);
    expect(mockCloseDeleteFn).toHaveBeenCalled();
  });

  it("should call handleDeleteBoard", () => {
    render(<DeleteModal closeDeleteModal={mockCloseDeleteFn} handleDeleteBoard={mockHandleDeleteBoardFn} />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockHandleDeleteBoardFn).toHaveBeenCalled();
  });
});
