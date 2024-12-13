import { render, screen, fireEvent } from "@testing-library/react";
import LoginWith from "../oauth/LoginWith";

describe("LoginWith Component", () => {
  const mockOnClick = jest.fn();
  const altText = "Google";
  const imageUrl = "/oauth/google.png";

  beforeEach(() => {
    render(<LoginWith onClick={mockOnClick} alt={altText} src={imageUrl} />);
  });

  test("renders the image with the correct src and alt attributes", () => {
    const imageElement = screen.getByAltText(altText);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", imageUrl);
  });

  test("calls onClick when the icon is clicked", () => {
    const iconElement = screen.getByAltText(
      new RegExp(altText, "i"),
    ).parentElement;

    fireEvent.click(iconElement!);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
