import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileSettings from "./ProfileSettings";
import { useLogout } from "@features/authentication/logout/hooks/useLogout";

jest.mock("@hookform/devtools", () => ({
  DevTool: () => null,
}));

jest.mock("@features/authentication/logout/hooks/useLogout", () => ({
  useNavigate: jest.fn(),
  useLogout: jest.fn(),
  logout: jest.fn(),
}));

import userReducer from "@state/user/user";
import themeReducer from "@state/theme/theme";
import sideBarReducer from "@state/side-bar/sideBar";
import { server } from "@mocks/server";

(useLogout as jest.Mock).mockReturnValue({ logout: jest.fn() });

const createWrapper = (initialState = {}) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      theme: themeReducer,
      sideBarData: sideBarReducer,
    },
    preloadedState: initialState,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

const createInitialState = (overrides = {}) => ({
  user: {
    isAuthenticated: true,
    userId: "test-user-id",
  },
  theme: {
    mode: "light",
  },
  ...overrides,
});

describe("ProfileSettings", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  beforeEach(async () => {
    (useLogout as jest.Mock).mockReturnValue({ logout: jest.fn() });
    const queryClient = new QueryClient();
    queryClient.clear();
  });

  it("renders loading state initially", async () => {
    const initialState = createInitialState();

    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    expect(screen.getByTestId("first-name")).toHaveValue("");
    expect(screen.getByTestId("last-name")).toHaveValue("");
    expect(screen.getByTestId("bio")).toHaveValue("");
    expect(screen.getByTestId("username")).toHaveValue("");
  });

  it("loads and displays user profile data", async () => {
    const initialState = createInitialState();
    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    await waitFor(() => {
      expect(screen.getByTestId("first-name")).not.toHaveValue("");
    });

    const firstNameInput = screen.getByTestId("first-name");
    const lastNameInput = screen.getByTestId("last-name");
    const bioInput = screen.getByTestId("bio");
    const usernameInput = screen.getByTestId("username");

    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");
    expect(bioInput).toHaveValue("Hello, I'm John Doe");
    expect(usernameInput).toHaveValue("johndoe");
  });

  it("handles image upload", async () => {
    const initialState = createInitialState();
    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const input = screen.getByTestId("image-upload");

    await userEvent.upload(input, file);

    const uploadedImage = screen.getByAltText("Profile Picture");
    expect(uploadedImage).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    const initialState = createInitialState();
    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    await waitFor(() => {
      expect(screen.getByTestId("first-name")).not.toHaveValue("");
    });

    const submitButton = screen.getByTestId("submit-button");
    const firstNameInput = screen.getByTestId("first-name");

    await userEvent.clear(firstNameInput);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    const initialState = createInitialState();
    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    await waitFor(() => {
      expect(screen.getByTestId("first-name")).not.toHaveValue("");
    });

    const submitButton = screen.getByTestId("submit-button");
    const firstNameInput = screen.getByTestId("first-name");

    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "Jane");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("updates user handle when username changes", async () => {
    const initialState = createInitialState();
    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    await waitFor(() => {
      expect(screen.getByTestId("username")).not.toHaveValue("");
    });

    const usernameInput = screen.getByTestId("username");

    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, "newusername");

    await waitFor(() => {
      expect(
        screen.getByText(/https:\/\/telware\.online\/newusername/i),
      ).toBeInTheDocument();
    });
  });

  it("shows submit button only when form is dirty", async () => {
    const initialState = createInitialState();
    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    await waitFor(() => {
      expect(screen.getByTestId("first-name")).not.toHaveValue("");
    });

    const submitButton = screen.getByTestId("submit-button");

    expect(submitButton).toHaveStyle({ transform: "translateY(300%)" });

    const firstNameInput = screen.getByTestId("first-name");
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "Jane");

    expect(submitButton).toHaveStyle({ transform: "translateY(0)" });
  });

  it("displays correct initials based on name fields", async () => {
    const initialState = createInitialState();
    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    await waitFor(() => {
      expect(screen.getByTestId("first-name")).not.toHaveValue("");
    });

    expect(screen.getByText("JD")).toBeInTheDocument();

    const firstNameInput = screen.getByTestId("first-name");
    const lastNameInput = screen.getByTestId("last-name");

    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "Alice");
    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, "Smith");

    expect(screen.getByText("AS")).toBeInTheDocument();
  });

  it("handles bio character limit", async () => {
    const initialState = createInitialState();
    render(<ProfileSettings />, { wrapper: createWrapper(initialState) });

    await waitFor(() => {
      expect(screen.getByTestId("bio")).not.toHaveValue("");
    });

    const bioInput = screen.getByTestId("bio");
    const longBio = "a".repeat(1000);

    await userEvent.clear(bioInput);
    await userEvent.type(bioInput, longBio);

    await waitFor(() => {
      expect(bioInput).toHaveValue(longBio.slice(0, 120));
    });
  });
});
