# Setting Up VSCode for Development

## Extensions

- Tailwind CSS Intellisense
- Visual Studio IntelliCode
- ES7+ React/Redux/React-Native/JS snippets
- Jest Snippets
- Jest

## Settings

**Note: All settings related changes will be done in the VSCode settings tab. Changes made in the User tab will apply globally to VSCode. Changes made in the Workspace tab will apply only to this repo**

### 1. Saving

To enable autosave:

1. Go to Settings
2. Change Auto Save to `afterDelay`
3. By default, the Auto Save Delay is set to 1000ms, which should be fine

### 2. Tabs

1. Go to Settings
2. Change Tab Size should be changed from 4 to 2

### 3. Bracket Pair Colors

Bracket Pair Colorization is now built into VSCode. To enable:

1. Go to Settings
2. Tick the box under `Bracket Pair Colorization: Enabled`

### 3. Emmet

By default, emmet doesn't work with JSX. To enable this

1. In Settings, click Extensions -> Emmet
2. Scroll down and choose "Edit in settings.json"
3. Add the following to your settings.json

```
"emmet.includeLanguages": {
  "javascript": "javascriptreact"
},
```

### 4. ESLint

1. Install the ESLint extension for VSCode
2. Head over to Settings -> Extensions -> ESLint
3. Change Run from `onType` to `onSave`

### 5. Prettier

1. Install the Prettier extension for VSCode
2. Head over to Settings
3. Choose Prettier for `Default Formatter`

### 6. Formatting

1. Go to Settings
2. Tick the box for `Format on Save`
3. (Optional) Tick the box for `Format on Paste`

### 7. Jest Extension

- The Jest tests can be ran via the Jest extension
- All that needs to be done is specify the Jest Command Line command in the settings for the Jest extension
  - This should be set to `yarn test --`

### Misc

- Untick the box for `Ignore Trim Whitespace`

## Optional Helpful Extensions

- Auto Import
- Auto Rename Tag
- CodeSnap: for code screenshots (if needed)
- Color Info: see css colour info
- Git Graph
- Import Cost: see package size of imports
- npm
- npm Intellisense
- vscode-icons
- colorize
  - NOTE: make sure to include javascript, javascriptreact, typescript, typescriptreact in the colorize.languages settings array 