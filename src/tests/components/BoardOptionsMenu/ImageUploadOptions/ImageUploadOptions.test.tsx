import { render } from "@testing-library/react";
import ImageUploadOptions from "../../../../components/BoardOptionsMenu/ImageUploadOptions/ImageUploadOptions";

describe("ImageUploadOptions", () => {
  it("should render successfully", () => {
    const view = render(<ImageUploadOptions />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
