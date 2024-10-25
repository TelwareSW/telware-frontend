import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../state/store";

function renderWithRedux(ui: any, renderOptions = {}) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { renderWithRedux as render };
