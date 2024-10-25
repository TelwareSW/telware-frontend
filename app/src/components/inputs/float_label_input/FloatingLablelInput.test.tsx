import "@testing-library/react";
import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import FloatingLabelInput from "./FloatingLabelInput";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";

describe("FloatingLabelInput", () => {
  const TestWrapper = ({
    defaultValues = {},
    validation = () => {},
    ...props
  }) => {
    const { register, watch } = useForm({ defaultValues });
    return (
      <FloatingLabelInput
        id="test-label"
        label="test-Label"
        register={register}
        watch={watch}
        data-testid="input-field"
        validation={validation}
        {...props}
      />
    );
  };

  beforeEach(() => {});

  it("renders with basic props", () => {
    render(<FloatingLabelInput label="Test Label" id="test" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "test");
  });

  it("shows floating label behavior on focus and input", async () => {
    render(<FloatingLabelInput label="Test Label" id="test" />);
    const input = screen.getByRole("textbox");
    const label = screen.getByText("Test Label");

    expect(label).not.toHaveStyle({ transform: "translateY(-50%) scale(0.7)" });

    fireEvent.focus(input);
    expect(label).toHaveStyle({ transform: "translateY(-50%) scale(0.7)" });

    fireEvent.blur(input);
    expect(label).not.toHaveStyle({ transform: "translateY(-50%) scale(0.7)" });

    await userEvent.type(input, "Test Value");
    expect(label).toHaveStyle({ transform: "translateY(-50%) scale(0.7)" });

    fireEvent.blur(input);
    expect(label).toHaveStyle({ transform: "translateY(-50%) scale(0.7)" });
  });

  it("handles validation correctly", async () => {
    const mockValidation = jest.fn((value: string) => value.length >= 3);
    render(
      <TestWrapper defaultValues={{ test: "" }} validation={mockValidation} />,
    );
    const input = screen.getByTestId("input-field");
    await userEvent.type(input, "a");
    expect(mockValidation).toHaveBeenCalledWith("a");

    await userEvent.type(input, "bc");
    expect(mockValidation).toHaveBeenCalledWith("abc");
    expect(input).toHaveStyle({ borderColor: "var(--color-success)" });
  });

  it("displays error state correctly", () => {
    render(
      <FloatingLabelInput
        label="Test Label"
        id="test"
        error="This is an error"
      />,
    );
    const input = screen.getByRole("textbox");
    const errorLabel = screen.getByText("This is an error");

    expect(input).toHaveStyle({ borderColor: "var(--color-error)" });
    expect(errorLabel).toHaveStyle({ color: "var(--color-error)" });
  });

  it("handles maxLength and shows character count", async () => {
    render(<TestWrapper defaultValues={{ "test-label": "" }} maxLength={5} />);
    const input = screen.getByTestId("input-field");

    expect(screen.getByText("0/5")).toBeInTheDocument();

    await userEvent.type(input, "abcde");
    expect(screen.getByText("5/5")).toBeInTheDocument();

    await userEvent.type(input, "f");
    expect(screen.getByText("5/5")).toBeInTheDocument();
    expect(input).toHaveValue("abcde");
  });

  it("works with react-hook-form integration", async () => {
    render(<TestWrapper defaultValues={{ "test-label": "Initial Value" }} />);
    const input = screen.getByTestId("input-field");

    expect(input).toHaveValue("Initial Value");

    await userEvent.clear(input);
    await userEvent.type(input, "New Value");
    expect(input).toHaveValue("New Value");
  });

  it("handles disabled state correctly", () => {
    render(<FloatingLabelInput label="Test Label" id="test" disabled />);
    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();
    expect(input).toHaveStyle({ opacity: "0.5" });
  });

  it("handles different input types", () => {
    render(
      <FloatingLabelInput
        label="Test Label"
        id="test"
        type="password"
        data-testid="input-field"
      />,
    );
    const input = screen.getByTestId("input-field");

    expect(input).toHaveAttribute("type", "password");
  });
});
