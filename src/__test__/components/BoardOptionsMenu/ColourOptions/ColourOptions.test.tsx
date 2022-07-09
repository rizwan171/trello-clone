import { render } from "@testing-library/react";
import ColorOptions from "../../../../components/BoardOptionsMenu/ColourOptions/ColourOptions";

describe("ColourOptions", () => {
  it("should render successfully", () => {
    const view = render(<ColorOptions />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
