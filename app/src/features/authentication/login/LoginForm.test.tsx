import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useLogin } from "./hooks/useLogin";
import LoginForm from "./LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("./hooks/useLogin");
jest.mock("./services/apiForgotPassword", () => ({
  forgotPassword: jest.fn(() => Promise.resolve()),
}));

describe("LoginForm", () => {
  const mockLogin = jest.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    (useLogin as jest.Mock).mockReturnValue({
      login: mockLogin,
      isPending: false,
    });
  });

  const renderWithQueryClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };

  it("renders the login form correctly", () => {
    renderWithQueryClient(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    renderWithQueryClient(<LoginForm />);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        { email: "test@example.com", password: "password123" },
        expect.any(Object)
      );
    });
  });

  it("displays error message when login fails", async () => {
    const errorMessage = "Invalid credentials";
    mockLogin.mockImplementation(
      (_, { onSettled } = { onSettled: jest.fn() }) => {
        onSettled(null, { message: errorMessage });
      }
    );

    renderWithQueryClient(<LoginForm />);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it("opens and closes the ForgotPasswordModal", async () => {
    renderWithQueryClient(<LoginForm />);

    expect(screen.queryByText("Reset your password")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(/forgot password\?/i));
    expect(await screen.findByText("Reset your password")).toBeInTheDocument();

    fireEvent.click(screen.getByText("×"));
    await waitFor(() => {
      expect(screen.queryByText("Reset your password")).not.toBeInTheDocument();
    });
  });

  it("disables the login button while loading", () => {
    (useLogin as jest.Mock).mockReturnValue({
      login: mockLogin,
      isPending: true,
    });

    renderWithQueryClient(<LoginForm />);
    expect(screen.getByRole("button")).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading spinner while logging in", () => {
    (useLogin as jest.Mock).mockReturnValue({
      login: mockLogin,
      isPending: true,
    });

    renderWithQueryClient(<LoginForm />);

    expect(screen.getByRole("button")).toContainElement(
      screen.getByTestId("spinner")
    );
  });

  it("resets the form after a successful login", async () => {
    const loginSuccess = jest.fn((_, { onSettled }) => {
      onSettled();
    });

    (useLogin as jest.Mock).mockReturnValue({
      login: loginSuccess,
      isPending: false,
    });

    renderWithQueryClient(<LoginForm />);

    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginSuccess).toHaveBeenCalled();

      expect((screen.getByLabelText(/email/i) as HTMLInputElement).value).toBe(
        ""
      );
      expect(
        (screen.getByLabelText(/password/i) as HTMLInputElement).value
      ).toBe("");
    });
  });
});
