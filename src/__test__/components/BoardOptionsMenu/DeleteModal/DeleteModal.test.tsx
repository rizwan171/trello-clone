import { fireEvent, render, RenderResult } from "@testing-library/react";
import DeleteModal from "../../../../components/BoardOptionsMenu/DeleteModal/DeleteModal";

describe("DeleteModal", () => {
  const mockCloseDeleteFn = jest.fn();
  const mockHandleDeleteBoardFn = jest.fn();

  let component: RenderResult;
  let asFragment: DocumentFragment;

  beforeEach(() => {
    component = render(<DeleteModal closeDeleteModal={mockCloseDeleteFn} handleDeleteBoard={mockHandleDeleteBoardFn} />);
    asFragment = component.asFragment();
  });

  it("should render successfully", () => {
    expect(asFragment).toMatchSnapshot();
  });

  it("should call closeDeleteModal", () => {
    const closeButton = component.getByText("Cancel");
    fireEvent.click(closeButton);
    expect(mockCloseDeleteFn).toHaveBeenCalled();
  });

  it("should call handleDeleteBoard", () => {
    const deleteButton = component.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockHandleDeleteBoardFn).toHaveBeenCalled();
  });
});
