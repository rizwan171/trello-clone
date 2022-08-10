import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "../../app/store";
import { Direction, DragDropContext, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";

// See https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// See the "Rendering a component that is a Draggable" section in docs/Testing Information.md
export function renderDraggableWithProviders(
  ui: React.ReactElement,
  { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {},
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void,
  direction: Direction = "vertical"
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="test-droppable" direction={direction}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {children}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
