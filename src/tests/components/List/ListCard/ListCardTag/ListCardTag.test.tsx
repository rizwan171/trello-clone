import ListCardTag from "../../../../../components/List/ListCard/ListCardTag/ListCardTag";
import { renderWithProviders } from "../../../../utils/renderUtils";

describe("ListCardTag", () => {
  it("should render successfully", () => {
    const tag = {
      id: "1",
      name: "Tag 1",
      colour: "#FF3244",
    };

    const view = renderWithProviders(<ListCardTag tag={tag} />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
