import { renderWithProviders } from "../../utils/renderUtils";
import NavBar from "../../../components/NavBar/NavBar";

describe("NavBar", () => {
  it("should render successfully", () => {
    const view = renderWithProviders(<NavBar />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
