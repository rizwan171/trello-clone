import { RootState } from "../../../../app/store";
import CardModalTags from "../../../../components/CardModal/CardModalTags/CardModalTags";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("CardModalTags", () => {
  let initialState: Partial<RootState>;

  beforeEach(() => {
    initialState = {
      currentSelectedCard: {
        value: {
          id: "1",
          title: "Test Card",
          description: "Test Description",
          listId: "1",
          attachments: [],
          tags: ["1", "2"],
        },
      },
      tags: {
        value: [
          {
            id: "1",
            name: "",
            colour: "#399e5a",
          },
          {
            id: "2",
            name: "",
            colour: "#5ABCB9",
          },
          {
            id: "3",
            name: "",
            colour: "#26532b",
          },
        ],
      },
    };
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<CardModalTags />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });
});
