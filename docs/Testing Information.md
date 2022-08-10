# Testing Information

This document details some information and tips for writing tests. For more information on the testing frameworks used, please consult the relevant documentation. Below are some links that may be helpful:

- https://jestjs.io/docs/using-matchers
- https://jestjs.io/docs/setup-teardown
- https://jestjs.io/docs/mock-functions
- https://testing-library.com/docs/react-testing-library/example-intro
- https://testing-library.com/docs/queries/about/
- https://testing-library.com/docs/react-testing-library/api

## Different types of tests

- Snapshot testing
  - Tests the UI of a component.
  - Renders a component, takes a snapshot after, and checks it matches the one we expect.
  - Note: changes to a component's UI that already has a snapshot test scenario requires updating its snapshot. To do this, simply run the test script and press `u` when prompted to update the snapshot.
  - For more information, see https://jestjs.io/docs/snapshot-testing
- Unit tests
  - Testing an individual piece of code.
  - In the context of this application, this means testing a single component and its contents by itself.
  - The unit tests for this application are written using Jest and React Testing Library.
- Integration tests
  - Testing multiple pieces of code together
  - In the context of this application, this means testing a components functionality when the whole app is running.
  - The integration tests for this application are written using Cypress.
  - Note: Currently there are no integration tests. This section will be updated after Cypress tests have been added.

## Running the different types of tests

- To run the Jest tests in the terminal: `yarn test`
- If you have the Jest extension setup, you can run the tests through the Jest tab or through the line gutter (see the [VSCode Setup doc](VSCode%20Setup.md) for information on how to setup the Jest extension)

## Writing Jest Tests

### Creating a test file

- Tests are stored under `src/tests`
- Each test has its own root folder with the name of the component being tested
- All child components are stored in folders under their parents i.e. `src/tests/BoardOptionsMenu` contains multiple folders for the multiple child components it has
- Test files are named based on the component being tested and end in `.test.ts` or `.test.tsx` (.tsx if React components are being tested)

### Test Structure

- When writing a Jest test for a component, the test should have one parent `describe`, containing child `it` blocks i.e.

```javascript
describe('Component', () => {

  it('should do something', () => {
    ...
  })

  it('should do something else', () => {
    ...
  })

})
```

### Naming of tests

- The `describe` block should be named after the component being tested
- The `it` blocks should explain in plain english what is being tested e.g.
  - `should render successfully`
  - `should open modal X`
  - `should download data`
  - `should update title`

### What to test in a component

- Each component test should have a `should render successfully` which renders the component and checks the component fragment.
- A test should cover all the functionality that component is responsible for.
- If a parent component has children components that take props, the test for the parent should check that those props are called and work as expected.
- If a parent component has children components that do not take props or interact with the parent, there is no need to test the child component's functionality within the parent. In this case, that child component's functionality will be covered by the child component's tests.

### Basic principles of Jest and React Testing Library

#### Rendering a component without any Redux bits i.e. no dispatch or useSelector

- Use the `render` method from React Testing Library to render the component in each `it` block

```javascript
describe("Component", () => {
  it("should do something", () => {
    render(<Component />);
  });
});
```

#### Rendering a component with Redux bits i.e. dispatch and/or useSelector

- Use the `renderWithProviders` method defined in `src/tests/renderUtils.tsx` to render the component in each `it` block
- This method takes an object to create an initial state for testing. This object should be instantiated in a `beforeEach` block
- **Note: If you have any `useSelector` or `useDispatch` hooks within your component, you need to use the above and provide an initial state for those hooks.**

```javascript
describe('Component', () => {

  let initialState: Partial<RootState>;

  beforeEach(() => {
    initialState = {
      ...
    }
  })

  it ('should do something', () => {
    renderWithProviders(<Component />, { preloadedState: initialState });
  })

})
```

#### Rendering a component that is a Draggable

- Use the `renderDraggableWithProviders` method defined in `src/tests/renderUtils.tsx` to render the component in each `it` block
- This is very similar to `renderWithProviders`, but expects a couple extra parameters: an onDragEnd function, and a direction value
  - **Note: For the purposes of testing a Draggable, the onDragEnd paramter can always be a jest mock. This parameter is required as part of `renderDraggableWithProviders` so that the jest mocks can be contained within the test files, and not be defined within the utils file**
  - direction is the orientation of your `Droppable`. This, by default, is vertical, but can also be horizontal
- Due to how React Beautiful DnD works, a `Draggable` must always be rendered within a parent `Droppable`. This is stated in the [docs by Atlassian](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/draggable.md).
- `render` or `renderWithProviders` will fail to render a `Draggable` that is not wrapped in a `Droppable`
- `Droppable` must also be contained within a root `DragDropContext`, as stated [in the docs](https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/drag-drop-context.md). As Atlassian mention, You can think of `DragDropContext` as having a similar purpose to the react-redux Provider component.
- An example usage of `renderDraggableWithProviders` can be seen in [ListCard.test.tsx](../src/tests/components/List/ListCard/ListCard.test.tsx)

Example:

```javascript
// DraggableComponent.js
const DraggableComponent = () => {
  return (
    <Draggable draggableId={id} index={index}>
      ...
    </Draggable>
  )
}

//DraggableComponent.test.js
describe('Component', () => {
  let initialState: Partial<RootState>;
  let onDragEnd: jest.Mock;

  beforeEach(() => {
    initialState = {
      ...
    }

    onDragEnd = jest.fn()
  })

  // make sure to clear the mocks after each test
  afterEach(() => jest.clearAllMocks())

  it ('should do something', () => {
    renderDraggableWithProviders(<DraggableComponent />, { preloadedState: initialState }, onDragEnd);
  })

})

```

#### Getting elements after rendering

- Elements are accessed via the `screen` object imported from React Testing Library
- `screen` has a bunch of query methods to retrieve elements. `getByText`, `getByAltText`, `getByTestId`
  - Note: The below will focus on `getBy`. To view all query methods, see https://testing-library.com/docs/queries/about/

```javascript
it ('should do something', () => {
  render(<Component />);

  const button = screen.getByText("Click Me");
  const button2 = screen.getByTestId("test-id-1");
  ...
})
```

- Note: `getByTestId` should only be used in exceptional cases. To use `getByTestId`, you need to define a `data-testid` attribute on your element e.g.

```javascript
const Component = () => {
  return (
    <div data-testid="id1">
    </div>
  );
};

it("should do something", () => {
  render(<Component />);

  const button = screen.getByTestId("id1");
  ...
});
```

#### Checking objects or variables are a value we expect, equal, or have the right length etc.

- To check an object, variable, or element's proprty is what we expect, use the `expect` method with the appropriate Jest/React Testing Library matchers e.g.

```javascript
it("should do something", () => {
  render(<Component />);

  // checking equality of primitive data types
  const num = 33;
  expect(num).toBe(33);

  // checking deep equality of objects
  // NOTE: .toBe() should NOT be used here as it does not check deep equality
  const obj = { property: "1" };
  expect(obj).toEqual({ property: "1" });

  // checking length of a list/array type
  const arr = [1,2,3];
  expect(arr).toHaveLength(3);

  // checking existence of an element
  const button = screen.getByTestId("id1");
  expect(button).toBeInTheDocument();
  ...
});
```

- To check something shouldn't match or shouldn't exist, append `.not` between the `expect` and the matcher i.e.

```javascript
it("should do something", () => {
  const num = 33;
  expect(num).not.toBe(44);
  ...
});
```

- Note: the above works for any matcher.

#### Difference between checking if an element exists and checking it doesnt

- To check an element exists, use `getBy` query functions e.g. `getByText`, `getByTestId`
- This is because when we expect something to exist, we want to be sure it exists, as if it doesn't, it would be a problem.
- `getBy` query functions will throw an error, so to ensure the element exists, use `getBy`.

```javascript
it("should exist", () => {
  const button = screen.getByTestId("id1");
  expect(button).toBeInTheDocument();
});
```

- To check an element should not exist, use `queryBy` query functions e.g. `queryByText`, `queryByTestId`
- `queryBy` will return null if the element does not exist, making it suitable to use with the `.toBeInTheDocument()` matcher
  - **Note: `getBy` can actually be used here as well, checking that it throws an exception when the element does not exist. For readability, use `queryBy` to make use of the `.not.toBeInTheDocument()` matcher**

```javascript
it("should not exist", () => {
  const button = screen.queryByTestId("non-existent-id");
  expect(button).not.toBeInTheDocument();
});
```

- For more information about jest queries, check out the [Types of Queries page](https://testing-library.com/docs/queries/about/) in the Testing Library docs

#### Using `getAllBy` and `queryAllBy` to check the existence of multiple elements

- To check multiple elements should exist, use `getAllBy` query functions e.g. `getAllByText`, `getAllByTestId`
- The `.toBeInTheDocument()` matcher can only be used on a single element. To check multiple elements exists, check the length of the result from `getAllBy` is what you expect

```javascript
it("should all exist", () => {
  const buttons = screen.getAllByText("button");
  expect(buttons).toHaveLength(3);
});
```

- To check multiple elements should exist, use `queryAllBy` query functions e.g. `queryAllByText`, `queryAllByTestId`
- As with `getAllBy`, the `.toBeInTheDocument()` matcher can only be used on a single element. To check multiple elements exists, check the length of the result from `queryAllBy` is 0

```javascript
it("should all not exist", () => {
  const buttons = screen.queryAllByText("button");
  expect(buttons).toHaveLength(0);
});
```

- **Note: Technically, it is possible to use `.toBeInTheDocument` with a list of multiple elements by looping through the result of `getAllBy`/`queryAllBy` i.e.**

```javascript
it("using toBeInTheDocument", () => {
  const buttons = screen.getAllByText("button");
  buttons.forEach(button => expect(button).toBeInTheDocument());
  expect(buttons).toHaveLength(3);

  ...

  const buttons = screen.queryAllByText("button");
  buttons.forEach(button => expect(button).not.toBeInTheDocument());
});
```

### Testing a component with Redux bits

#### Getting the state within a test

- The `renderWithProviders` method returns a lot of helpful data about the component as well as the actual component. We can access the state by extracting the `store` object and calling `getState` on it:

```javascript
it ('should do something', () => {
  const { store } = renderWithProviders(<Component />, { preloadedState: initialState });
  const state = store.getState();
  ...
})
```

#### Checking that dispatch is called and does what we expect

- When testing a component function that dispatches an action and results in some change, we don't check for the dispatch call. Instead, we check that the state after the action is performed e.g.

```javascript
// lets say we have the below Component
const Component = () => {
  return (
    <div>
      <button onClick={() => dispatch(updateData())}>Click Me To Update Data!</button>
    </div>
  );
};

// in our test, we'd check the state updates after click i.e.
it("should update data after click", () => {
  const { store } = renderWithProviders(<Component />, { preloadedState: initialState });
  const stateBeforeUpdate = store.getState();

  const button = screen.getByText("Click Me To Update Data!");
  fireEvent.click(button);

  const stateAfterUpdate = store.getState();
  expect(stateAfterUpdate).not.toEqual(stateBeforeUpdate);
});
```

### Testing a component that takes props

- If a component takes props, those props should be mocked and passed to the component in the `render` method
- The test should simply check if those mocks are called i.e.

```javascript
it("should call mock prop after click", () => {
  const propMock = jest.fn();
  const { store } = render(<Component prop={propMock} />);

  const button = screen.getByText("Click me!");
  fireEvent.click(button);

  expect(propMock).toHaveBeenCalled();
});
```

- Note: the above also applies if you're using `renderWithProviders`

### Clearing mocks if used

- If your test defines any mocks or spys, make sure to add an `afterEach` block that clears the mocks after each test

```javascript
afterEach(() => {
  jest.clearAllMocks();
});
```

### Resetting fake timers if used

- If your test uses any fake timers in a test i.e. `jest.useFakeTimers()`, make sure to add an `afterEach` block that resets the timers after each test

```javascript
afterEach(() => {
  jest.clearAllTimers();
});
```

### Things to watch out for

#### Be careful when mocking `document` methods that manipulate the dom i.e. `createElement`

- When mocking a method like `createElement`, make sure to use `mockImplementationOnce` instead of `mockImplementation`
- This is because if you mock this before a React rerender, the rerender will result in an error as it also uses `createElement`, which you have mocked for the entirety of the test if you use `mockImplementation`.
- This is not an issue with `mockImplementationOnce` as after the `createElement` you expect to happen, the mock is not used for subsequent calls to `createElement`, meaning the rerender can happen without an issue

#### Be careful of the order of your `document` mocks that manipulate the dom i.e. `createElement`

- Related to the above, if you mock a method like `createElement`, and expect it to happen after something rerenders, you should call your action that triggers the rerender and then define your mock i.e.

```javascript
it("should do something", () => {
  // won't work
  jest.spyOn(document, "createElement").mockImplementationOnce(() => ...);
  const button = screen.getByText("Click Me to Rerender");
  fireEvent.click(button);
  ...

  // correct order
  const button = screen.getByText("Click Me to Rerender");
  fireEvent.click(button);
  jest.spyOn(document, "createElement").mockImplementationOnce(() => ...);
  ...
})
```

- Note: this only applies if you expect the `createElement` to be called after a rerender. If you expect it before a rerender, the mock should be defined before a rerender
- See the `should export the selected list data` and `should export all successfully` scenarios in [Board Options Menu test](../src/tests/components/BoardOptionsMenu/BoardOptionsMenu.test.tsx) for both cases

#### Use `waitFor` if you expect a state change after an async method

- If what you're testing includes an async method or a method that does not bubble, and you expect the state to change after, use a `waitFor` to ensure the code is run and your state is updated before you check anything i.e.

```javascript
// incorrect
it("should do something", () => {
  const stateOfComponentBefore = ...

  const button = screen.getByText("Click me to trigger method that has async method or one that does not bubble!");
  fireEvent.click(button);

  // will not be true
  expect(stateAfter).not.toEqual(stateOfComponentBefore);
  // other expect statements
});

// correct
it("should do something", () => {
  const stateOfComponentBefore = ...

  const button = screen.getByText("Click me to trigger method that has async method or one that does not bubble!");
  fireEvent.click(button);

  // will not be true
  await waitFor(() => {
    expect(stateAfter).not.toEqual(stateOfComponentBefore);
  })
  // other expect statements
});
```

- See the `should import data successfully` scenario in [Board Options Menu test](../src/tests/components/BoardOptionsMenu/BoardOptionsMenu.test.tsx) for an example

#### Providing a value for `new Date()` to check

- If you are testing a piece of code that sets dates, it can be hard to check the returned object's date field to ensure it matches what we expect
- Use `jest.useFakeTimers()` to provide a constant value i.e.

```javascript
const Component = () => {
  const date = new Date()
  return <div>{date}</div>
}

// test
it ("should be created with date", () => {
 // naming only for demonstration. in your test, this should be named
 // appropriately, either simply "date" or something more descriptive if needed
  const dateWeDefinedHere = new Date();
  jest.useFakeTimers()..setSystemTime(dateWeDefinedHere)

  //render component here and get the element

  expect(divElementText).toBe(dateWeDefinedHere);
})
```

- See the `should save a single uploaded file successfully` scenario in [Attachment Menu test](../src/tests/components/CardModal/CardModalActions/AttachmentMenu/AttachmentMenu.test.tsx) for an example

#### Mocking localforage `setItem` to verify it has been called

- Spying on `setItem` does not seem to work i.e. `jest.spyOn(localforage, "setItem")`
- To verify this has been called, you need to provide a mock for `setItem` and expect that mock to be called i.e.

- See the `should save a single uploaded file successfully` scenario in [Attachment Menu test](../src/tests/components/CardModal/CardModalActions/AttachmentMenu/AttachmentMenu.test.tsx) for an example
