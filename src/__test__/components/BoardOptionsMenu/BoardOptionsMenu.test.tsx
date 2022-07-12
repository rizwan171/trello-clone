import { cleanup, fireEvent, screen } from "@testing-library/react";
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
        value: [
          { id: "1", title: "Test List 1" },
          { id: "2", title: "Test List 2" },
        ],
      },
      cards: {
        value: [
          { id: "1", listId: "1", title: "Card 1", description: "Desc 1", tags: ["1"], attachments: [] },
          { id: "2", listId: "2", title: "Card 2", description: "Desc 2", tags: ["1", "2"], attachments: [] },
        ],
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
    cleanup();
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

  it("should open export list modal", () => {
    renderWithProviders(<BoardOptionsMenu />, { preloadedState: initialState });
    const exportListButton = screen.getByText(/Export List/) as HTMLButtonElement;
    expect(exportListButton).toBeInTheDocument();

    const exportSelector = screen.getByRole("combobox") as HTMLSelectElement;
    const exportButton = screen.getAllByText("Export").filter((e: HTMLElement) => e.tagName === "BUTTON")[0] as HTMLButtonElement;
    const cancelButton = screen.getByText("Cancel") as HTMLButtonElement;

    fireEvent.click(exportListButton);
    expect(exportSelector.options).toHaveLength(3);
    expect(exportButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it("should export all successfully", () => {
    renderWithProviders(<BoardOptionsMenu />, { preloadedState: initialState });

    const mockClick = jest.fn();
    const mockRemove = jest.fn();
    const mockDownloadLink = document.createElement("a");

    jest.spyOn(mockDownloadLink, "click").mockImplementation(mockClick);
    jest.spyOn(mockDownloadLink, "remove").mockImplementation(mockRemove);
    jest.spyOn(document, "createElement").mockImplementationOnce(() => mockDownloadLink);

    const expectedJson = {
      board: {
        id: "1",
        title: "Test Board",
      },
      lists: [
        { id: "1", title: "Test List 1" },
        { id: "2", title: "Test List 2" },
      ],
      cards: [
        { id: "1", listId: "1", title: "Card 1", description: "Desc 1", tags: ["1"], attachments: [] },
        { id: "2", listId: "2", title: "Card 2", description: "Desc 2", tags: ["1", "2"], attachments: [] },
      ],
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
};);
