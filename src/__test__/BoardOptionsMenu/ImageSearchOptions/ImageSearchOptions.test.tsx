import TestRenderer from "react-test-renderer";
import ImageSearchOptions from "../../../components/BoardOptionsMenu/ImageSearchOptions/ImageSearchOptions";

describe("ImageSearchOptions", () => {
  it("should render successfully", () => {
    const component = TestRenderer.create(<ImageSearchOptions />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
