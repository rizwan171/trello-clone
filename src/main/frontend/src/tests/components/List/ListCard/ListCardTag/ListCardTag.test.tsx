import { render } from "@testing-library/react";
import ListCardTag from "../../../../../components/List/ListCard/ListCardTag/ListCardTag";

describe("ListCardTag", () => {
  it("should render successfully", () => {
    const tag = {
      id: "1",
      name: "Tag 1",
      colour: "#FF3244",
    };

    const view = render(<ListCardTag tag={tag} />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
