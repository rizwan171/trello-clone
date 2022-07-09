import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../app/store";
import BoardOptionsMenu from "../../../components/BoardOptionsMenu/BoardOptionsMenu";
import { renderWithProviders } from "../../utils/renderUtils";

describe("BoardOptionsMenu", () => {
  let initialState: Partial<RootState>;

  beforeEach(() => {
    initialState = {
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const view = renderWithProviders(<BoardOptionsMenu />, { preloadedState: initialState });
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should change selected tab", () => {
    renderWithProviders(<BoardOptionsMenu />, { preloadedState: initialState });
    const colourBackgroundTab = screen.getByText("Colour") as HTMLButtonElement;
    const imageSearchBackgroundTab = screen.getByText("Image Search") as HTMLButtonElement;
    const imageUploadBackgroundTab = screen.getByText("Image Upload") as HTMLButtonElement;

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
    renderWithProviders(<BoardOptionsMenu />, { preloadedState: initialState });
    const importAllButton = screen.getByText("Import All") as HTMLButtonElement;
    const fileInput = screen.getByTestId("file") as HTMLInputElement;
    const clickSpy = jest.spyOn(fileInput, "click");

    fireEvent.click(importAllButton);
    expect(clickSpy).toHaveBeenCalled();
  });

  it("should export all successfully", () => {
    renderWithProviders(<BoardOptionsMenu />, { preloadedState: initialState });
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
    const exportAllButton = screen.getByText("Export All") as HTMLButtonElement;
    fireEvent.click(exportAllButton);

    expect(mockDownloadLink.href).toEqual(expectedHref);
    expect(mockDownloadLink.download).toBe("data.json");
    expect(mockClick).toHaveBeenCalled();
    expect(mockRemove).toHaveBeenCalled();
  });
});
