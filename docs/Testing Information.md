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

#### Rendering with component with Redux bits i.e. dispatch and/or useSelector

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

- To check an object, variable, or element's proprty is what we expect, use the `expect` method with the appropriate Jest matchers e.g.

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
  waitFor(() => {
    expect(stateAfter).not.toEqual(stateOfComponentBefore);
  })
  // other expect statements
});
```

- See the `should import data successfully` scenario in [Board Options Menu test](../src/tests/components/BoardOptionsMenu/BoardOptionsMenu.test.tsx) for an example
