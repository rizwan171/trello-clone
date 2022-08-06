import CardModalTag from "../../../../../components/CardModal/CardModalTags/CardModalTag/CardModalTag";
import { renderWithProviders } from "../../../../utils/renderUtils";

describe("CardModalTag", () => {
  it("should render successfully", () => {
    const tag = {
      id: "1",
      name: "Tag 1",
      colour: "#FF3244",
    };

    const view = renderWithProviders(<CardModalTag tag={tag} />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
