import { fireEvent, screen } from "@testing-library/react";
import CardModalActions from "../../../../components/CardModal/CardModalActions/CardModalActions";
import { renderWithProviders } from "../../../utils/renderUtils";

describe("CardModalActions", () => {
  it("should render successfully", () => {
    const view = renderWithProviders(<CardModalActions />);
    expect(view.asFragment()).toMatchSnapshot();
  });

  it("should show tags menu", () => {
    const { store } = renderWithProviders(<CardModalActions />);
    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeFalsy();

    const tagsMenuButton = screen.getByTestId("card-modal-actions-tags-button") as HTMLButtonElement;
    expect(tagsMenuButton).toBeInTheDocument();

    fireEvent.click(tagsMenuButton);

    expect(store.getState().modalActionMenusVisibility.value.tagsMenuOpen).toBeTruthy();
  });

  it("should show copy menu", () => {
    const { store } = renderWithProviders(<CardModalActions />);
    expect(store.getState().modalActionMenusVisibility.value.copyMenuOpen).toBeFalsy();

    const copyMenuButton = screen.getByTestId("card-modal-actions-copy-button") as HTMLButtonElement;
    expect(copyMenuButton).toBeInTheDocument();

    fireEvent.click(copyMenuButton);

    expect(store.getState().modalActionMenusVisibility.value.copyMenuOpen).toBeTruthy();
  });

  it("should show move menu", () => {
    const { store } = renderWithProviders(<CardModalActions />);
    expect(store.getState().modalActionMenusVisibility.value.moveMenuOpen).toBeFalsy();

    const moveMenuButton = screen.getByTestId("card-modal-actions-move-button") as HTMLButtonElement;
    expect(moveMenuButton).toBeInTheDocument();

    fireEvent.click(moveMenuButton);

    expect(store.getState().modalActionMenusVisibility.value.moveMenuOpen).toBeTruthy();
  });

  it("should show delete menu", () => {
    const { store } = renderWithProviders(<CardModalActions />);
    expect(store.getState().modalActionMenusVisibility.value.deleteMenuOpen).toBeFalsy();

    const deleteMenuButton = screen.getByTestId("card-modal-actions-delete-button") as HTMLButtonElement;
    expect(deleteMenuButton).toBeInTheDocument();

    fireEvent.click(deleteMenuButton);

    expect(store.getState().modalActionMenusVisibility.value.deleteMenuOpen).toBeTruthy();
  });

  it("should show attachment menu", () => {
    const { store } = renderWithProviders(<CardModalActions />);
    expect(store.getState().modalActionMenusVisibility.value.attachmentMenuOpen.id).toBe(0);
    expect(store.getState().modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeFalsy();

    const attachmentMenuButton = screen.getByTestId("card-modal-actions-attachment-menu-button") as HTMLButtonElement;
    expect(attachmentMenuButton).toBeInTheDocument();

    fireEvent.click(attachmentMenuButton);

    expect(store.getState().modalActionMenusVisibility.value.attachmentMenuOpen.id).toBe(1);
    expect(store.getState().modalActionMenusVisibility.value.attachmentMenuOpen.status).toBeTruthy();
  });
});
