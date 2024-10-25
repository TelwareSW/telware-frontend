import styled from "styled-components";
import SideBarHeader from "./SideBarHeader";
import OptionsList from "./OptionsList";

const StyledSideBar = styled.div`
  grid-row: 1 / -1;

  background-color: var(--color-background);
  border-right: 5px solid var(--color-border);
  overflow-y: auto;
`;

interface SettingsSideBarProps {
  children?: React.ReactNode;
}

function SettingsSideBar({ children }: SettingsSideBarProps) {
  return (
    <StyledSideBar>
      <SideBarHeader />
      {children}
      <OptionsList />
    </StyledSideBar>
  );
}

export default SettingsSideBar;
