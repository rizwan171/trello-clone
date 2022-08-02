import NavBar from "../../../components/NavBar/NavBar";
import { render } from "@testing-library/react";

describe("NavBar", () => {
  it("should render successfully", () => {
    const view = render(<NavBar />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
