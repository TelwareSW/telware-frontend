import { screen, fireEvent, render } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import renderWithStore from "@tests/test-utils";

describe("ThemeToggle Component", () => {
  test("should render toggle switch with DARK theme initially", () => {
    render(renderWithStore(<ThemeToggle />));

    const slider = screen.getByTestId("toggle-mode-slider");
    const checkbox = screen.getByTestId(
      "toggle-mode-checkbox"
    ) as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
    expect(slider).toHaveStyle("background-color: var(--accent-color)");
  });

  test("should toggle to LIGHT theme on click", () => {
    render(renderWithStore(<ThemeToggle />));

    const checkbox = screen.getByTestId(
      "toggle-mode-checkbox"
    ) as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(false);
  });
});
