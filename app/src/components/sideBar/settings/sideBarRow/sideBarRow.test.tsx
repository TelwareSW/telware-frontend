import { render, screen, fireEvent } from "@testing-library/react";
import SideBarRow, { SideBarRowProps } from "./SideBarRow";
import { updateSideBarView } from "../../../../state/sideBar/sideBar";
import renderWithStore from "../../test-utils";
import { getIcon } from "../../../../data/icons";
import { privacyStates, activeStates } from "types/sideBar";

jest.mock("../../../hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock("../../../data/icons", () => ({
  getIcon: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockedUseAppSelector = require("../../../hooks").useAppSelector;
const mockedUseAppDispatch = require("../../../hooks").useAppDispatch;
describe("SideBarRow", () => {
  beforeEach(() => {
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
    mockedUseAppSelector.mockReturnValue({
      privacySettings: {
        storiesSeenPrivacy: privacyStates.EVERYONE,
        lastSeenPrivacy: privacyStates.EVERYONE,
        profilePhotoPrivacy: privacyStates.EVERYONE,
        addToGroupPrivacy: privacyStates.EVERYONE,
        addToChannelPrivacy: privacyStates.EVERYONE,
      },
      activitySettings: {
        readReceiptsPrivacy: activeStates.ENABLED,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps: SideBarRowProps = {
    title: "Test Title",
    activityStatus: undefined,
    privacyStatus: undefined,
    redirect: 1,
    count: 5,
  };

  it("renders title and count", () => {
    (getIcon as jest.Mock).mockReturnValue(<div data-testid="icon" />);

    render(renderWithStore(<SideBarRow {...defaultProps} />));

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("displays current privacy status if available", () => {
    const propsWithPrivacyStatus: SideBarRowProps = {
      ...defaultProps,
      privacyStatus: 0,
    };

    render(renderWithStore(<SideBarRow {...propsWithPrivacyStatus} />));

    expect(screen.getByText("everyone")).toBeInTheDocument();
  });

  it("displays current activity status if available", () => {
    const propsWithPrivacyStatus: SideBarRowProps = {
      ...defaultProps,
      activityStatus: 0,
    };

    render(renderWithStore(<SideBarRow {...propsWithPrivacyStatus} />));

    expect(screen.getByText("enabled")).toBeInTheDocument();
  });

  it("dispatches updateSideBarView when clicked", () => {
    render(renderWithStore(<SideBarRow {...defaultProps} />));

    fireEvent.click(screen.getByText("Test Title"));

    expect(mockDispatch).toHaveBeenCalledWith(
      updateSideBarView({
        redirect: 1,
      })
    );
  });

  it("does not dispatch updateSideBarView when redirect is undefined", () => {
    const propsWithoutRedirect: SideBarRowProps = {
      ...defaultProps,
      redirect: undefined,
    };

    render(renderWithStore(<SideBarRow {...propsWithoutRedirect} />));

    fireEvent.click(screen.getByText("Test Title"));

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it("renders without a count and verifies conditional rendering", () => {
    const propsWithoutCount: SideBarRowProps = {
      ...defaultProps,
      count: undefined,
    };

    render(renderWithStore(<SideBarRow {...propsWithoutCount} />));
    expect(screen.queryByText("5")).not.toBeInTheDocument();
  });

  it("calls updateSideBarView with correct data structure", () => {
    const propsWithPrivacyStatus: SideBarRowProps = {
      ...defaultProps,
      privacyStatus: 0,
    };

    render(renderWithStore(<SideBarRow {...propsWithPrivacyStatus} />));

    fireEvent.click(screen.getByText("Test Title"));

    expect(mockDispatch).toHaveBeenCalledWith(
      updateSideBarView({
        redirect: 1,
        data: expect.objectContaining({
          header: expect.any(String),
          state: expect.any(String),
          data: expect.any(Object),
        }),
      })
    );
  });
});
