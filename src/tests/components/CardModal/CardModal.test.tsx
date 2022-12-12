import { fireEvent, screen, waitFor } from "@testing-library/react";
import { RootState } from "../../../app/store";
import CardModal from "../../../components/CardModal/CardModal";
import { renderWithProviders } from "../../utils/renderUtils";

describe("CardModal", () => {
  let initialState: Partial<RootState>;

  beforeEach(() => {
    const card = {
      id: "1",
      title: "Card 1",
      listId: "1",
      description: "Description 1",
      tags: [],
      attachments: [],
    };

    initialState = {
      cards: {
        value: [card],
      },
      currentSelectedCard: {
        value: { ...card },
      },
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

  it("should render successfully", () => {
    const view = renderWithProviders(<CardModal />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should update card title on enter press", () => {
    const { store } = renderWithProviders(<CardModal />, { preloadedState: initialState });
    expect(store.getState().cards.value[0].title).toBe("Card 1");
    const cardTitleHeader = screen.getByText("Card 1") as HTMLHeadingElement;
    expect(cardTitleHeader).toBeInTheDocument();

    fireEvent.click(cardTitleHeader);

    const cardTitleTextArea = screen.getByText("Card 1") as HTMLTextAreaElement;
    expect(cardTitleTextArea).toBeInTheDocument();
    expect(cardTitleHeader).not.toBeInTheDocument();

    fireEvent.change(cardTitleTextArea, { target: { value: "Updated Title" } });
    fireEvent.keyDown(cardTitleTextArea, { key: "Enter" });

    expect(store.getState().cards.value[0].title).toBe("Updated Title");
    expect(store.getState().currentSelectedCard.value?.title).toBe("Updated Title");
  });

  it("should not update card title on blur", () => {
    const { store } = renderWithProviders(<CardModal />, { preloadedState: initialState });
    expect(store.getState().cards.value[0].title).toBe("Card 1");
    expect(store.getState().currentSelectedCard.value?.title).toBe("Card 1");
    const cardTitleHeader = screen.getByText("Card 1") as HTMLHeadingElement;
    expect(cardTitleHeader).toBeInTheDocument();

    fireEvent.click(cardTitleHeader);

    const cardTitleTextArea = screen.getByText("Card 1") as HTMLTextAreaElement;
    expect(cardTitleTextArea).toBeInTheDocument();
    expect(cardTitleHeader).not.toBeInTheDocument();

    fireEvent.change(cardTitleTextArea, { target: { value: "Updated Title" } });
    fireEvent.blur(cardTitleTextArea);

    expect(store.getState().cards.value[0].title).toBe("Card 1");
    expect(store.getState().currentSelectedCard.value?.title).toBe("Card 1");
  });

  it("should blur card description on escape press", async () => {
    const { store } = renderWithProviders(<CardModal />, { preloadedState: initialState });
    expect(store.getState().cards.value[0].description).toBe("Description 1");
    expect(store.getState().currentSelectedCard.value?.description).toBe("Description 1");

    const cardDescriptionTextArea = screen.getByText("Description 1") as HTMLTextAreaElement;
    expect(cardDescriptionTextArea).toBeInTheDocument();

    const onBlurSpy = jest.spyOn(cardDescriptionTextArea, "blur");

    fireEvent.change(cardDescriptionTextArea, { target: { value: "Updated Description" } });
    fireEvent.keyDown(cardDescriptionTextArea, { key: "Escape" });

    expect(onBlurSpy).toHaveBeenCalled();
  });

  it("should update card description on blur", () => {
    const { store } = renderWithProviders(<CardModal />, { preloadedState: initialState });
    expect(store.getState().cards.value[0].description).toBe("Description 1");
    expect(store.getState().currentSelectedCard.value?.description).toBe("Description 1");

    const cardDescriptionTextArea = screen.getByText("Description 1") as HTMLTextAreaElement;
    expect(cardDescriptionTextArea).toBeInTheDocument();

    fireEvent.change(cardDescriptionTextArea, { target: { value: "Updated Description" } });
    fireEvent.blur(cardDescriptionTextArea);

    expect(store.getState().cards.value[0].description).toBe("Updated Description");
    expect(store.getState().currentSelectedCard.value?.description).toBe("Updated Description");
  });

  it("should close card modal on close icon clicked", () => {
    const { store } = renderWithProviders(<CardModal />, { preloadedState: initialState });
    expect(store.getState().currentSelectedCard.value).toBeDefined();

    const closeIcon = screen.getByTestId("card-modal-close-icon");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);

    expect(store.getState().currentSelectedCard.value).toBeNull();
  });

  it("should close card modal on escape press", () => {
    const { store } = renderWithProviders(<CardModal />, { preloadedState: initialState });
    expect(store.getState().currentSelectedCard.value).toBeDefined();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(store.getState().currentSelectedCard.value).toBeNull();
  });
});
