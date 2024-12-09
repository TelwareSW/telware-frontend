import styled from "styled-components";
import OptionsList from "./OptionsList";
import SettingsSideBarHeader from "./SettingsSideBarHeader";
import { SideBarRowProps } from "./side-bar-row/SideBarRow";

interface SettingsSideBarProps {
  children?: React.ReactNode;
  rows: SideBarRowProps[];
}

const StyledSettingsSideBar = styled.div`
  height: 100vh;
  background-color: var(--color-background);
  overflow-y: auto;
`;

function SettingsSideBar({ rows, children }: SettingsSideBarProps) {
  return (
    <StyledSettingsSideBar>
      <SettingsSideBarHeader />
      {children}
      <OptionsList rows={rows} />
    </StyledSettingsSideBar>
  );
}

export default SettingsSideBar;
