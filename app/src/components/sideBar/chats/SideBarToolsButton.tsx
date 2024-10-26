import { useState } from "react";
import styled from "styled-components";
import { MenuOutlined } from "@mui/icons-material";
import ThemeToggle from "./ThemeToggle";
import { useAppDispatch } from "../../../hooks";
import { toggleTheme } from "../../../state/theme/theme";
import SideBarMenuItem from "./SideBarMenuItem";
import { updateSideBarView } from "../../../state/sideBar/sideBar";
import { sideBarPages } from "../../../data/sideBar";

const StyledToolsIcon = styled(MenuOutlined)`
  color: var(--color-icon-secondary);
  border-radius: var(--border-radius-modal);
  padding: 0.3rem;
  &:hover {
    cursor: pointer;
    background-color: var(--color-background-compact-menu-hover);
  }
`;

const StyledList = styled.ul<{ $isOpened?: boolean }>`
  position: absolute;
  width: 13rem;
  top: 3.325rem;
  left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  list-style: none;
  padding: 0.5rem 0.2rem;
  background-color: var(--color-background);
  box-shadow: 0 0.25rem 0.5rem 0.125rem var(--color-default-shadow);
  border-radius: var(--border-radius-default);
  visibility: ${({ $isOpened }) => ($isOpened ? "visible" : "hidden")};
`;

function SettingsToolbar() {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useAppDispatch();
  const handleOpenSettings = () => {
    setIsOpened((prevState) => !prevState);
  };
  return (
    <>
      <StyledToolsIcon onClick={handleOpenSettings} fontSize="large" />
      {isOpened && (
        <StyledList $isOpened={isOpened}>
          <SideBarMenuItem
            title="Contacts"
            iconMapValue="Contacts"
            onClick={() =>
              dispatch(
                updateSideBarView({
                  redirect: sideBarPages.CONTACTS,
                  data: undefined,
                })
              )
            }
          />
          <SideBarMenuItem
            title="Settings"
            iconMapValue="Settings"
            onClick={() =>
              dispatch(
                updateSideBarView({
                  redirect: sideBarPages.SETTINGS,
                  data: undefined,
                })
              )
            }
          />
          <SideBarMenuItem
            title="Dark Mode"
            iconMapValue="NightMode"
            onClick={() => dispatch(toggleTheme())}
          >
            <ThemeToggle />
          </SideBarMenuItem>
        </StyledList>
      )}
    </>
  );
}

export default SettingsToolbar;