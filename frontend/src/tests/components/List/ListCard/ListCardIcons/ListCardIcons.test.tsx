import { render } from "@testing-library/react";
import ListCardIcons from "../../../../../components/List/ListCard/ListCardIcons/ListCardIcons";

describe("ListCardIcons", () => {
  it("should render successfully with no icons", () => {
    const card = {
      id: "1",
      title: "Test Card",
      description: "",
      listId: "1",
      attachments: [],
      tags: [],
    };

    const view = render(<ListCardIcons card={card} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with description icons", () => {
    const card = {
      id: "1",
      title: "Test Card",
      description: "Test Description",
      listId: "1",
      attachments: [],
      tags: [],
    };

    const view = render(<ListCardIcons card={card} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with attachment icons", () => {
    const card = {
      id: "1",
      title: "Test Card",
      description: "",
      listId: "1",
      attachments: [{ id: "1", date: "date-string", name: "test-attachment" }],
      tags: [],
    };

    const view = render(<ListCardIcons card={card} />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should render successfully with description and attachment icons", () => {
    const card = {
      id: "1",
      title: "Test Card",
      description: "Test Description",
      listId: "1",
      attachments: [{ id: "1", date: "date-string", name: "test-attachment" }],
      tags: [],
    };

    const view = render(<ListCardIcons card={card} />);
    expect(view.asFragment()).toMatchSnapshot();
  });
});
