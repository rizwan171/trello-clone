import { render } from "@testing-library/react";
import CardModalTag from "../../../../../components/CardModal/CardModalTags/CardModalTag/CardModalTag";

describe("CardModalTag", () => {
  it("should render successfully", () => {
    const tag = {
      id: "1",
      name: "Tag 1",
      colour: "#FF3244",
    };

    const view = render(<CardModalTag tag={tag} />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
