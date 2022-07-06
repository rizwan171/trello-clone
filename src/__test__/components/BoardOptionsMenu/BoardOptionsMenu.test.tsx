import { fireEvent, RenderResult } from "@testing-library/react";
import BoardOptionsMenu from "../../../components/BoardOptionsMenu/BoardOptionsMenu";
import { renderWithProviders } from "../../utils/test-utils";

describe("BoardOptionsMenu", () => {
  let component: RenderResult;
  let asFragment: DocumentFragment;

  beforeEach(() => {
    const initialState = {
      board: {
        value: {
          id: "1",
          title: "Test Board",
        },
      },
      lists: {
        value: [{ id: "1", title: "Test List" }],
      },
      cards: {
        value: [],
      },
      tags: {
        value: [
          { id: "1", name: "To Do", colour: "#592941" },
          { id: "2", name: "Doing", colour: "#498467" },
          { id: "3", name: "Done", colour: "#EDE5A6" },
        ],
      },
    };

    component = renderWithProviders(<BoardOptionsMenu />, { preloadedState: initialState });
    asFragment = component.asFragment();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    expect(asFragment).toMatchSnapshot();
  });

  it("should change selected tab", () => {
    const colourBackgroundTab = component.getByText("Colour") as HTMLButtonElement;
    const imageSearchBackgroundTab = component.getByText("Image Search") as HTMLButtonElement;
    const imageUploadBackgroundTab = component.getByText("Image Upload") as HTMLButtonElement;

    expect(colourBackgroundTab.className).toContain("selected-tab");
    expect(imageSearchBackgroundTab.className).not.toContain("selected-tab");
    expect(imageUploadBackgroundTab.className).not.toContain("selected-tab");

    fireEvent.click(imageSearchBackgroundTab);
    expect(imageSearchBackgroundTab.className).toContain("selected-tab");
    expect(colourBackgroundTab.className).not.toContain("selected-tab");
    expect(imageUploadBackgroundTab.className).not.toContain("selected-tab");

    fireEvent.click(imageUploadBackgroundTab);
    expect(imageUploadBackgroundTab.className).toContain("selected-tab");
    expect(colourBackgroundTab.className).not.toContain("selected-tab");
    expect(imageSearchBackgroundTab.className).not.toContain("selected-tab");
  });

  it("should open file upload window", () => {
    const importAllButton = component.getByText("Import All") as HTMLButtonElement;
    const fileInput = component.getByTestId("file") as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, "click");

    fireEvent.click(importAllButton);
    expect(clickSpy).toHaveBeenCalled();
  });

  it("should export all successfully", () => {
    const mockDownloadLink = document.createElement("a");
    const mockClick = jest.fn();
    const mockRemove = jest.fn();
    jest.spyOn(mockDownloadLink, "click").mockImplementation(mockClick);
    jest.spyOn(mockDownloadLink, "remove").mockImplementation(mockRemove);
    jest.spyOn(document, "createElement").mockImplementation(() => mockDownloadLink);

    const expectedJson = {
      board: {
        id: "1",
        title: "Test Board",
      },
      lists: [{ id: "1", title: "Test List" }],
      cards: [],
      tags: [
        { id: "1", name: "To Do", colour: "#592941" },
        { id: "2", name: "Doing", colour: "#498467" },
        { id: "3", name: "Done", colour: "#EDE5A6" },
      ],
    };
    const expectedHref = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(expectedJson))}`;
    const exportAllButton = component.getByText("Export All") as HTMLButtonElement;
    fireEvent.click(exportAllButton);

    expect(mockDownloadLink.href).toEqual(expectedHref);
    expect(mockDownloadLink.download).toEqual("data.json");
    expect(mockClick).toHaveBeenCalled();
    expect(mockRemove).toHaveBeenCalled();
  });
});
