import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import DeleteModal from "../../../components/BoardOptionsMenu/DeleteModal/DeleteModal";

const mockCloseDeleteFn = jest.fn();
const mockHandleDeleteBoardFn = jest.fn();

let component: RenderResult;
let asFragment: DocumentFragment;

beforeEach(() => {
  component = render(<DeleteModal closeDeleteModal={mockCloseDeleteFn} handleDeleteBoard={mockHandleDeleteBoardFn} />);
  asFragment = component.asFragment();
});

describe("DeleteModal", () => {
  it("should render successfully", () => {
    expect(asFragment).toMatchSnapshot();
  });

  it("should call close modal", () => {
    const closeButton = screen.getByText("Cancel");
    fireEvent.click(closeButton);
    expect(mockCloseDeleteFn).toHaveBeenCalled();
  });

  it('should call delete board', () => {
        const deleteButton = screen.getByText("Delete");
        fireEvent.click(deleteButton);
        expect(mockHandleDeleteBoardFn).toHaveBeenCalled();
  });
});