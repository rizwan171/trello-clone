import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../app/store";
import ListCard from "../../../../components/List/ListCard/ListCard";
import { renderDraggableWithProviders } from "../../../utils/renderUtils";

describe("ListCard", () => {
  let initialState: Partial<RootState>;
  let onDragEnd: jest.Mock;

  beforeEach(() => {
    initialState = {
      tags: {
        value: [
          {
            id: "1",
            name: "Tag 1",
            colour: "#EEEEEE",
          },
          {
            id: "1",
            name: "Tag 2",
            colour: "#000000",
          },
        ],
      },
      currentSelectedCard: {
        value: null,
      },
    };

    onDragEnd = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully with no icons", () => {
    const card = {
      id: "1",
      title: "Test Card",
      description: "",
      listId: "1",
      attachments: [],
      tags: ["1"],
    };

    const view = renderDraggableWithProviders(<ListCard card={card} index={0} />, { preloadedState: initialState }, onDragEnd);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with icons", () => {
    const card = {
      id: "1",
      title: "Test Card",
      description: "Test Description",
      listId: "1",
      attachments: [{ id: "1", date: "date-string", name: "test-attachment" }],
      tags: ["1"],
    };

    const view = renderDraggableWithProviders(<ListCard card={card} index={0} />, { preloadedState: initialState }, onDragEnd);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should update currentSelectedCard to the current card", () => {
    const card = {
      id: "1",
      title: "Test Card",
      description: "Test Description",
      listId: "1",
      attachments: [{ id: "1", date: "date-string", name: "test-attachment" }],
      tags: ["1"],
    };

    const { store } = renderDraggableWithProviders(
      <ListCard card={card} index={0} />,
      { preloadedState: initialState },
      onDragEnd
    );
    const stateBeforeClick = store.getState();
    expect(stateBeforeClick.currentSelectedCard.value).toBeNull();

    const listCardContainer = screen.getByTestId("list-card-container") as HTMLDivElement;
    expect(listCardContainer).toBeInTheDocument();

    fireEvent.click(listCardContainer);

    const stateAfterClick = store.getState();
    expect(stateAfterClick.currentSelectedCard.value).toEqual(card);
  });
});
