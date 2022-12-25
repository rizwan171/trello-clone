import { render } from "@testing-library/react";
import Collapse from "../../../components/Collapse/Collapse";

describe("Collapse", () => {
  it("should render successfully when open", () => {
    const view = render(
      <Collapse isOpen={true}>
        <div>test</div>
      </Collapse>
    );
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully when closed", () => {
    const view = render(
      <Collapse isOpen={false}>
        <div>test</div>
      </Collapse>
    );
    expect(view.asFragment()).toMatchSnapshot();
  });
});
