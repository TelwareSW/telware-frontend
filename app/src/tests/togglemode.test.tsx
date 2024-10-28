import { screen, fireEvent } from "@testing-library/react";
import { render } from "../components/side-bar/settings/test-utils";
import ThemeToggle from "../components/side-bar/chats/ThemeToggle";

describe("ThemeToggle Component", () => {
  test("should render toggle switch with LIGHT theme initially", () => {
    render(<ThemeToggle />);

    const checkbox = screen.getByTestId(
      "toggle-mode-checkbox"
    ) as HTMLInputElement;
    const slider = screen.getByTestId("toggle-mode-slider");

    expect(checkbox.checked).toBe(false);
    expect(slider).toHaveStyle("background-color: var(--pattern-color)");
  });

  test("should toggle to DARK theme on click", () => {
    render(<ThemeToggle />);

    const checkbox = screen.getByTestId(
      "toggle-mode-checkbox"
    ) as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });
});
