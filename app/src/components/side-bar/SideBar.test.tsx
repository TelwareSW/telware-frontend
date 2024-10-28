import { render, screen } from "@testing-library/react";
import * as update from "@features/privacy-settings/service/changeSettings";
import renderWithStore from "../../tests/test-utils";

import SideBar from "./SideBar";
import {
  privacySettings,
  privacySettingsRows,
  settingsRows,
} from "data/sideBar";

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
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)", // Modify as needed
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    (update.changeSettings as jest.Mock).mockResolvedValue({});
    mockedUseAppDispatch.mockResolvedValue({});
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
      screen.getByText("Who can see my profile photo?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Who can add me to group chats?")
    ).toBeInTheDocument();
    expect(screen.getByText("Who can add me to channels?")).toBeInTheDocument();
  });
});
