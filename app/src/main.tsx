// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./state/store.ts";

import App from "./App.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    // </StrictMode>
  );
});
