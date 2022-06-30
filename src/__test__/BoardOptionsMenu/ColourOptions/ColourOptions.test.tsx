import TestRenderer from "react-test-renderer";
import ColorOptions from "../../../components/BoardOptionsMenu/ColourOptions/ColourOptions";

describe("ColourOptions", () => {
  it("should render successfully", () => {
    const component = TestRenderer.create(<ColorOptions />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
