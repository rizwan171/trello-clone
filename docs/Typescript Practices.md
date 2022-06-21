# Typescript Practices
This document describes Typescript practices to follow when working on this project.

## File types
- Files with JSX elements (i.e. React components) end should with `.tsx`
- Other typescript files should end with `.ts`

## Type Definitions
### Defining types
- Types can either be defined as an interface or type i.e.
```javascript
interface Type1 {
  prop1: string
}

type Type2 = {
  prop1: string
}
```
- Interface will define a type as an object always
- If you need to define a type for a single param, use type
- When defining types:
  - use interface where possible
  - type should be used only when typing a single param or deriving a type from another type i.e. `type TypeB = Pick<TypeA, "prop">`

### Folder structure
- All type definitions are stored under `src/types`
- Types are split into 3 main categories: global, component, and reducers

#### Global Types
- Contains type definitions for common data objects used throughout the app e.g. card, list, tag
- Stored under `src/types/global`

#### Component Types
- Contains type definitions for component props and component specific data objects
- Stored under `src/types/components`

#### Reducers Type
- Contains type definitions for Redux Toolkit Slices and their respective Reducers (i.e. files under `).
- Stored under `src/types/reducers`

## Development Notes
### Typescript for React Function Components
- Function Components should have `JSX.Element` as their type
- If the function has props, a type definition for the component's props should be created under `src/types/components` and used to type the props i.e.
```javascript
export default interface ComponentProps {
  prop1: string
}
...
...
const Component = ({ prop1 }: ComponentProps): JSX.Element => {
  // code here
}
```
- Note: `React.FC/React.FunctionComponent` is available but that is not preferred. 
  - See the "Why is React.FC discouraged?" on https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components

### useRef
- When using the `useRef` hook, it must have a type in angle brackets i.e. `useRef<HTMLInputElement>(null)`. Note: the null is important here as without it, typescript will throw an error
- `HTMLInputElement` and other DOM related types are provided by Typescript for us to use. IntelliSense (Ctrl + Space) is your friend here
- See https://www.typescriptlang.org/docs/handbook/dom-manipulation.html for more information

### Redux Toolkit with Typescript
- There are 2 notable changes to Redux Toolkit hooks
  - `useDispatch` has been replaced in favour of `useAppDispatch`
  - `useSelector` has been replaced in favour of `useAppSelector`
- The hook definitions are found in `src/app/hooks.ts`

### Input HTML elements
- The `type` attribute on input elements should be replaced with `typeof` instead.

### Typescript for event handlers
- When defining events on elements within a component, the event handler's event parameter must have a relevant type i.e.
```javascript
const Component = () => {
  const keyDownHandler = (e: KeyboardEvent<HTMLInputelement>) => {
    // do something
  }

  return <input typeof="text" onKeyDown={keyDownHandler} />
}
```
- When defining event listeners on the `document` object, the event handler's event parameter must have a relevant type as before BUT the event interface must be retrieved from `globalThis` i.e.
```javascript
const Component = () => {
  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler)
  }, []);

  const keyDownHandler = (e: globalThis.KeyboardEvent) => {
    // do something
  }
}
```