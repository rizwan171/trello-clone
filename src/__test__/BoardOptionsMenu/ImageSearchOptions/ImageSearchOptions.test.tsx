import { render } from "@testing-library/react";
import ImageSearchOptions from "../../../components/BoardOptionsMenu/ImageSearchOptions/ImageSearchOptions";

describe("ImageSearchOptions", () => {
  it("should render successfully", () => {
    const component = render(<ImageSearchOptions />);
    expect(component.asFragment()).toMatchSnapshot();
  });
});
