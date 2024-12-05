import { render, screen } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField", () => {
  const mockRegister = jest.fn();
  const label = "Email";
  const id = "email";
  const type = "email";
  const errorMessage = "Email is required";
  const placeholder = "Enter your email";

  beforeEach(() => {
    mockRegister.mockClear();
  });

  it("renders the input field with the correct label", () => {
    render(
      <InputField
        label={label}
        id={id}
        register={mockRegister}
        error={undefined}
        type={type}
      />,
    );

    const input = screen.getByLabelText(label);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", id);
    expect(input).toHaveAttribute("type", type);
  });

  it("calls register with the correct id", () => {
    render(
      <InputField
        label={label}
        id={id}
        register={mockRegister}
        error={undefined}
      />,
    );

    expect(mockRegister).toHaveBeenCalledWith(id);
  });

  it("renders the error message when there is an error", () => {
    render(
      <InputField
        label={label}
        id={id}
        register={mockRegister}
        error={errorMessage}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("hides the placeholder when the input is focused", () => {
    render(
      <InputField
        label={label}
        id={id}
        register={mockRegister}
        error={undefined}
      />,
    );

    const input = screen.getByLabelText(label);
    input.focus();
    expect(screen.getByText(label)).toHaveStyle("top: 0;");
  });

  it("shows the placeholder when the input is empty", () => {
    render(
      <InputField
        label={label}
        id={id}
        register={mockRegister}
        error={undefined}
        placeholder={placeholder}
      />,
    );

    const input = screen.getByLabelText(label);

    expect(input).toHaveAttribute("placeholder", placeholder);
  });
});
