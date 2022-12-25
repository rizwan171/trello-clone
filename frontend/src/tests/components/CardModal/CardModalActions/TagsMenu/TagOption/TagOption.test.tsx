import { fireEvent, render, screen } from "@testing-library/react";
import TagOption from "../../../../../../components/CardModal/CardModalActions/TagsMenu/TagOption/TagOption";
import Tag from "../../../../../../types/global/Tag";

describe("TagOption", () => {
  let tag: Tag;
  let mockEditTag: jest.Mock;
  let mockTagClicked: jest.Mock;

  beforeEach(() => {
    tag = {
      id: "1",
      name: "Test Tag",
      colour: "#CCCCCC",
    };
    mockEditTag = jest.fn();
    mockTagClicked = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully when selected", () => {
    const view = render(<TagOption tag={tag} isSelected={true} editTag={mockEditTag} tagClicked={mockTagClicked} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully when not selected", () => {
    const view = render(<TagOption tag={tag} isSelected={false} editTag={mockEditTag} tagClicked={mockTagClicked} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should call editTag", () => {
    render(<TagOption tag={tag} isSelected={false} editTag={mockEditTag} tagClicked={mockTagClicked} />);

    const editIcon = screen.getByTestId("edit-icon");
    expect(editIcon).toBeInTheDocument();

    fireEvent.click(editIcon);

    expect(mockEditTag).toHaveBeenCalledWith(tag);
  });

  it("should call tagClicked", () => {
    render(<TagOption tag={tag} isSelected={true} editTag={mockEditTag} tagClicked={mockTagClicked} />);

    const tagOptionInnerContainer = screen.getByTestId("tag-option-inner-container") as HTMLDivElement;
    expect(tagOptionInnerContainer).toBeInTheDocument();

    fireEvent.click(tagOptionInnerContainer);

    expect(mockTagClicked).toHaveBeenCalledWith(tag);
  });
});
