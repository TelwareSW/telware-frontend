import { render, screen } from "@testing-library/react";
import * as update from "@features/privacy-settings/service/changeSettings";
import renderWithStore from "@tests/test-utils";
import SideBar from "./SideBar";
import { privacySettingsRows, settingsRows } from "@data/sideBar";

jest.mock("@hookform/devtools", () => ({
  DevTool: () => null,
}));

jest.mock("@features/privacy-settings/service/changeSettings", () => ({
  changeSettings: jest.fn(),
}));

jest.mock("@hooks/useGlobalState", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock("@features/authentication/logout/hooks/useLogout", () => ({
  useNavigate: jest.fn(),
  useLogout: jest.fn(),
  logout: jest.fn(),
}));

const mockedUseAppSelector = require("@hooks/useGlobalState").useAppSelector;
const mockedUseAppDispatch = require("@hooks/useGlobalState").useAppDispatch;
const mockedUseLogout =
  require("@features/authentication/logout/hooks/useLogout").useLogout;

describe("Sidebar", () => {
  beforeAll(() => {
    (update.changeSettings as jest.Mock).mockResolvedValue({});
    mockedUseAppDispatch.mockResolvedValue({ dispatch: jest.fn() });
    const mockDispatch = jest.fn();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseLogout.mockReturnValue({ logout: jest.fn() });
  });

  it("renders the Chats sidebar", () => {
    mockedUseAppSelector.mockReturnValue({
      page: "CHATS",
      props: {},
    });

    render(renderWithStore(<SideBar />));

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders the Contacts sidebar", () => {
    mockedUseAppSelector.mockReturnValue({
      page: "CONTACTS",
      props: {},
    });

    render(renderWithStore(<SideBar />));
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders the Settings sidebar", () => {
    mockedUseAppSelector.mockReturnValue({
      page: "SETTINGS",
      props: {
        rows: settingsRows,
      },
    });

    render(renderWithStore(<SideBar />));

    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Privacy and Security")).toBeInTheDocument();
    expect(screen.getByText("Devices")).toBeInTheDocument();
    expect(screen.getByText("General Settings")).toBeInTheDocument();
  });

  it("renders the Privacy sidebar", () => {
    mockedUseAppSelector.mockReturnValue({
      page: "PRIVACY_SETTINGS",
      props: {
        rows: privacySettingsRows,
      },
    });

    render(renderWithStore(<SideBar />));

    expect(screen.getByText("Blocked Users")).toBeInTheDocument();
    expect(screen.getByText("Who can see my stories?")).toBeInTheDocument();
    expect(screen.getByText("Who can see my last seen?")).toBeInTheDocument();
    expect(
      screen.getByText("Who can see my profile photo?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Who can add me to group chats?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Who can add me to channels?")).toBeInTheDocument();
  });

  it("renders the update-settings sidebar", () => {
    mockedUseAppSelector.mockReturnValue({
      page: "SETTINGS_UPDATE",
      props: {
        data: {
          header: "Last Seen & Online",
          data: {
            id: "lastSeenPrivacy",
            title: "Test Title",
            options: [
              { id: "1", label: "Option 1", value: "EVERYONE" },
              { id: "2", label: "Option 2", value: "CONTACTS" },
              { id: "3", label: "Option 3", value: "NOBODY" },
            ],
          },
        },
        updateFnType: true,
      },
    });

    render(renderWithStore(<SideBar />));

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("renders the profile update sidebar", () => {
    mockedUseAppSelector.mockReturnValue({
      page: "PROFILE_UPDATE",
      props: {},
    });

    render(renderWithStore(<SideBar />));

    expect(screen.getByLabelText("First Name (required)")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name (optional)")).toBeInTheDocument();
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("applies fade out animation on page change", () => {
    mockedUseAppSelector.mockReturnValueOnce({ page: "CHATS", props: {} });
    const { rerender } = render(renderWithStore(<SideBar />));

    mockedUseAppSelector.mockReturnValueOnce({ page: "CONTACTS", props: {} });
    rerender(renderWithStore(<SideBar />));

    const element = screen.getByTestId("side-bar");
    const computedStyle = window.getComputedStyle(element);
    expect(computedStyle.animation).toContain("0.1s ease-in-out");
  });

  it("renders different content dynamically based on page key", () => {
    mockedUseAppSelector.mockReturnValue({ page: "CHATS", props: {} });
    render(renderWithStore(<SideBar />));
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    mockedUseAppSelector.mockReturnValue({
      page: "SETTINGS",
      props: {
        rows: settingsRows,
      },
    });
    render(renderWithStore(<SideBar />));
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Privacy and Security")).toBeInTheDocument();
    expect(screen.getByText("Devices")).toBeInTheDocument();
    expect(screen.getByText("General Settings")).toBeInTheDocument();
  });

  it("renders settings sidebar with correct rows", () => {
    mockedUseAppSelector.mockReturnValue({
      page: "SETTINGS",
      props: {
        rows: [{ id: "1", title: "Notification Settings" }],
      },
    });
    render(renderWithStore(<SideBar />));

    expect(screen.getByText("Notification Settings")).toBeInTheDocument();
  });

  it("handles missing page data gracefully", () => {
    mockedUseAppSelector.mockReturnValue({
      page: undefined,
      props: {},
    });
    render(renderWithStore(<SideBar />));

    expect(screen.queryByText("Search")).not.toBeInTheDocument();
  });
});
