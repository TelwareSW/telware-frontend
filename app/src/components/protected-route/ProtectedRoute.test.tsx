// ProtectedRoute.test.tsx
import { render, screen } from "@testing-library/react";
import ProtectedRoute from "./ProtectedRoute";
import useAuthCheck from "@features/authentication/login/hooks/useAuthCheck";

jest.mock("@features/authentication/login/hooks/useAuthCheck");

describe("ProtectedRoute", () => {
  function MockChildComponent() {
    return <div>Protected Content</div>;
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders children when authenticated", () => {
    (useAuthCheck as jest.Mock).mockReturnValue(true);

    render(
      <ProtectedRoute>
        <MockChildComponent />
      </ProtectedRoute>
    );

    const protectedContent = screen.getByText(/protected content/i);
    expect(protectedContent).toBeInTheDocument();
  });

  it("does not render children when not authenticated", () => {
    (useAuthCheck as jest.Mock).mockReturnValue(false);

    render(
      <ProtectedRoute>
        <MockChildComponent />
      </ProtectedRoute>
    );

    const protectedContent = screen.queryByText(/protected content/i);
    expect(protectedContent).not.toBeInTheDocument();
  });
});
