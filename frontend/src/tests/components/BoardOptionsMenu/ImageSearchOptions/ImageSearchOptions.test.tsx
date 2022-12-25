import { render } from "@testing-library/react";
import ImageSearchOptions from "../../../../components/BoardOptionsMenu/ImageSearchOptions/ImageSearchOptions";

describe("ImageSearchOptions", () => {
  it("should render successfully", () => {
    const view = render(<ImageSearchOptions />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
