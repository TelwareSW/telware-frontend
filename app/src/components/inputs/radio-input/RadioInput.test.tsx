import { RadioInputProps } from "@components/inputs/radio-input/RadioInput";
import { fireEvent, render, screen } from "@testing-library/react";
import * as update from "@features/privacy-settings/service/changeSettings";
import SettingsUpdate from "@components/side-bar/settings/SettingsUpdate";
import renderWithStore from "@tests/test-utils";

jest.mock("@features/privacy-settings/service/changeSettings", () => ({
  changeSettings: jest.fn(),
}));

describe("RadioInput", () => {
  const mockData: RadioInputProps = {
    data: {
      id: "lastSeenPrivacy",
      title: "Test Title",
      options: [
        { id: "1", label: "Option 1", value: "EVERYONE" },
        { id: "2", label: "Option 2", value: "CONTACTS" },
        { id: "3", label: "Option 3", value: "NOBODY" },
      ],
    },
    updateFnType: true,
  };

  beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)", // Modify as needed
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    (update.changeSettings as jest.Mock).mockResolvedValue({});
  });

  it("renders privacySettings", () => {
    const data = mockData;

    render(renderWithStore(<SettingsUpdate {...data} />));

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
  });

  it("renders activitySettings", () => {
    const data: RadioInputProps = {
      data: { ...mockData.data, id: "readReceiptsPrivacy" },
      updateFnType: false,
    };

    render(renderWithStore(<SettingsUpdate {...data} />));

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Option 2")).toBeInTheDocument();
  });

  it("selects the default state", () => {
    const data: RadioInputProps = {
      ...mockData,
      state: "Option 2",
    };

    render(renderWithStore(<SettingsUpdate {...data} />));

    expect(
      (screen.getByLabelText("Option 2") as HTMLInputElement).checked
    ).toBe(true);
    expect(
      (screen.getByLabelText("Option 1") as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (screen.getByLabelText("Option 3") as HTMLInputElement).checked
    ).toBe(false);
  });

  it("changes the selected input upon click", () => {
    const data: RadioInputProps = {
      ...mockData,
      state: "Option 2",
    };

    render(renderWithStore(<SettingsUpdate {...data} />));

    expect(
      (screen.getByLabelText("Option 3") as HTMLInputElement).checked
    ).toBe(false);

    const option3RadioButton = screen.getByLabelText("Option 3");
    fireEvent.click(option3RadioButton);

    expect(
      (screen.getByLabelText("Option 2") as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (screen.getByLabelText("Option 1") as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (screen.getByLabelText("Option 3") as HTMLInputElement).checked
    ).toBe(true);
  });

  it("renders with no default state", () => {
    const data: RadioInputProps = {
      ...mockData,
      state: undefined, // or null
    };

    render(renderWithStore(<SettingsUpdate {...data} />));

    expect(
      (screen.getByLabelText("Option 1") as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (screen.getByLabelText("Option 2") as HTMLInputElement).checked
    ).toBe(false);
    expect(
      (screen.getByLabelText("Option 3") as HTMLInputElement).checked
    ).toBe(false);
  });
});
