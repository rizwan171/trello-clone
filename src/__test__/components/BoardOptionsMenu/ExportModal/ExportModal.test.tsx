import { fireEvent, RenderResult } from "@testing-library/react";
import ExportModal from "../../../../components/BoardOptionsMenu/ExportModal/ExportModal";
import { renderWithProviders } from "../../../utils/test-utils";

describe("ExportModal", () => {
  const mockCloseExportModal = jest.fn();
  const mockHandleExportList = jest.fn();

  let component: RenderResult;
  let asFragment: DocumentFragment;

  beforeEach(() => {
    component = renderWithProviders(
      <ExportModal closeExportModal={mockCloseExportModal} handleExportList={mockHandleExportList} />,
      {
        preloadedState: {
          lists: {
            value: [
              { id: "1", title: "Test 1" },
              { id: "2", title: "Test 2" },
              { id: "3", title: "Test 3" },
              { id: "4", title: "Test 4" },
              { id: "5", title: "Test 5" },
            ],
          },
        },
      }
    );
    asFragment = component.asFragment();
  });

  it("should render successfully", () => {
    expect(asFragment).toMatchSnapshot();
  });

  it("should update selected list", () => {
    const selectOptions = component.getAllByRole("option") as HTMLOptionElement[];
    // no. of lists + 1 extra default option
    const expectedOptionValues = ["", "1", "2", "3", "4", "5"];
    const expectedOptionTexts = ["Select List...", "Test 1", "Test 2", "Test 3", "Test 4", "Test 5"];
    const actualOptionValues = selectOptions.map((option) => option.value);
    const actualOptionTexts = selectOptions.map((option) => option.text);
    expect(selectOptions.length).toEqual(6);
    expect(actualOptionValues).toStrictEqual(expectedOptionValues);
    expect(actualOptionTexts).toStrictEqual(expectedOptionTexts);

    const selector = component.getByRole("combobox") as HTMLSelectElement;
    expect(selector.value).toEqual("");

    fireEvent.select(selector, { target: { value: "1" } });
    expect(selector.value).toEqual("1");

    fireEvent.select(selector, { target: { value: "4" } });
    expect(selector.value).toEqual("4");
  });

  it("should call handleExportList", () => {
    const selector = component.getByRole("combobox") as HTMLSelectElement;
    fireEvent.select(selector, { target: { value: "1" } });
    expect(selector.value).toEqual("1");

    const exportButton = component.getByText("Export");
    fireEvent.click(exportButton);

    expect(mockHandleExportList).toHaveBeenCalled();
  });

  it("should call closeExportModal", () => {
    const closeButton = component.getByText("Cancel");
    fireEvent.click(closeButton);
    expect(mockCloseExportModal).toHaveBeenCalled();
  });
});
