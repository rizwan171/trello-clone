import { fireEvent, screen } from "@testing-library/react";
import { RootState } from "../../../../app/store";
import ExportModal from "../../../../components/BoardOptionsMenu/ExportModal/ExportModal";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("ExportModal", () => {
  let mockCloseExportModal: jest.Mock;
  let mockHandleExportList: jest.Mock;
  let initialState: Partial<RootState>;

  beforeEach(() => {
    mockCloseExportModal = jest.fn();
    mockHandleExportList = jest.fn();

    initialState = {
      lists: {
        value: [
          { id: "1", title: "Test 1" },
          { id: "2", title: "Test 2" },
          { id: "3", title: "Test 3" },
          { id: "4", title: "Test 4" },
          { id: "5", title: "Test 5" },
        ],
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const view = renderWithProviders(
      <ExportModal closeExportModal={mockCloseExportModal} handleExportList={mockHandleExportList} />,
      { preloadedState: initialState }
    );
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should update selected list", () => {
    renderWithProviders(<ExportModal closeExportModal={mockCloseExportModal} handleExportList={mockHandleExportList} />, {
      preloadedState: initialState,
    });
    const selector = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selector.value).toBe("");
    expect(selector.options).toHaveLength(6);

    const expectedOptionValues = initialState.lists?.value.map((option) => option.id);
    expectedOptionValues?.unshift("");
    const actualOptionValues = [...selector.options].map((option) => option.value);
    expect(actualOptionValues).toStrictEqual(expectedOptionValues);

    const expectedOptionTexts = initialState.lists?.value.map((option) => option.title);
    expectedOptionTexts?.unshift("Select List...");
    const actualOptionTexts = [...selector.options].map((option) => option.text);
    expect(actualOptionTexts).toStrictEqual(expectedOptionTexts);

    fireEvent.select(selector, { target: { value: "1" } });
    expect(selector.value).toBe("1");

    fireEvent.select(selector, { target: { value: "4" } });
    expect(selector.value).toBe("4");
  });

  it("should call handleExportList", () => {
    renderWithProviders(<ExportModal closeExportModal={mockCloseExportModal} handleExportList={mockHandleExportList} />, {
      preloadedState: initialState,
    });
    const selector = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.select(selector, { target: { value: "1" } });
    expect(selector.value).toBe("1");

    const exportButton = screen.getByText("Export");
    fireEvent.click(exportButton);

    expect(mockHandleExportList).toHaveBeenCalled();
  });

  it("should call closeExportModal", () => {
    renderWithProviders(<ExportModal closeExportModal={mockCloseExportModal} handleExportList={mockHandleExportList} />, {
      preloadedState: initialState,
    });
    const closeButton = screen.getByText("Cancel");
    fireEvent.click(closeButton);
    expect(mockCloseExportModal).toHaveBeenCalled();
  });
});
