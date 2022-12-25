import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../app/store";
import List from "../../../components/List/List";
import ListType from "../../../types/global/List";
import { renderDraggableWithProviders } from "../../utils/renderUtils";

describe("List", () => {
  let initialState: Partial<RootState>;
  let list: ListType;
  let onDragEnd: jest.Mock;
  let mockScrollIntoView: jest.Mock;

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
      cards: {
        value: [
          {
            id: "1",
            title: "Card 1",
            description: "Description 1",
            listId: "1",
            tags: [],
            attachments: [],
          },
          {
            id: "2",
            title: "Card 2",
            description: "Description 2",
            listId: "1",
            tags: [],
            attachments: [],
          },
          {
            id: "3",
            title: "Card 3",
            description: "Description 3",
            listId: "1",
            tags: [],
            attachments: [],
          },
        ],
      },
    };

    mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    onDragEnd = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully when add card form is closed", () => {
    const view = renderDraggableWithProviders(<List list={list} index={0} />, { preloadedState: initialState }, onDragEnd);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully when add card form is open", () => {
    const { asFragment, rerender } = renderDraggableWithProviders(
      <List list={list} index={0} />,
      { preloadedState: initialState },
      onDragEnd
    );
    expect(asFragment()).toMatchSnapshot();

    const addCardPrompt = screen.getByTestId("add-card-prompt-container");
    expect(addCardPrompt).toBeInTheDocument();

    fireEvent.click(addCardPrompt);

    rerender(<List list={list} index={0} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
