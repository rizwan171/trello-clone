import TestRenderer from "react-test-renderer";
import ImageUploadOptions from "../../../components/BoardOptionsMenu/ImageUploadOptions/ImageUploadOptions";

describe("ImageUploadOptions", () => {
  it("should render successfully", () => {
    const component = TestRenderer.create(<ImageUploadOptions />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
