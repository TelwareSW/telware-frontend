import { screen, fireEvent, render } from "@testing-library/react";
import ThemeToggle from "../components/side-bar/chats/ThemeToggle";
import renderWithStore from "@components/side-bar/test-utils";

describe("ThemeToggle Component", () => {
  test("should render toggle switch with LIGHT theme initially", () => {
    render(renderWithStore(<ThemeToggle />));

    const slider = screen.getByTestId("toggle-mode-slider");
    const checkbox = screen.getByTestId(
      "toggle-mode-checkbox"
    ) as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
    expect(slider).toHaveStyle("background-color: var(--pattern-color)");
  });

  test("should toggle to DARK theme on click", () => {
    render(renderWithStore(<ThemeToggle />));

    const checkbox = screen.getByTestId(
      "toggle-mode-checkbox"
    ) as HTMLInputElement;

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });
});
