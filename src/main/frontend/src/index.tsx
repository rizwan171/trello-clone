import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./components/App";
import { setupStore } from "./app/store"; "./app/store";
import "./css/index.css";

const rootDiv = document.getElementById("root");
if (!rootDiv) {
  throw new Error("Root container missing in index.html");
}

const root = createRoot(rootDiv);
const store = setupStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
