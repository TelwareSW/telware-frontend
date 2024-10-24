import { useState } from "react";
import styled from "styled-components";
import { MenuOutlined } from "@mui/icons-material";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ThemeToggle from "./ThemeToggle";

const MenuOutlinedIcon = styled(MenuOutlined)`
  color: var(--color-icon-secondary);
  border-radius: var(--border-radius-modal);
  padding: 0.3rem;
  &:hover {
    cursor: pointer;
    background-color: var(--color-background-compact-menu-hover);
  }
`;

const StyledSettingsToolbar = styled.ul<{ $isOpened?: boolean }>`
  position: absolute;
  width: 16.5rem;
  top: 3.325rem;
  left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  list-style: none;
  padding: 0.5rem 0.2rem;
  background-color: var(--color-background);
  box-shadow: 0 0.25rem 0.5rem 0.125rem var(--color-default-shadow);
  border-radius: var(--border-radius-default);
  visibility: ${({ $isOpened }) => ($isOpened ? "visible" : "hidden")};
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 0.2rem 0.6rem;
  color: var(--color-text);
  font-size: 0.8rem;
  border-radius: var(--border-radius-default-tiny);
  &:hover {
    background: var(--color-background-compact-menu-hover);
    cursor: pointer;
  }
`;

function SettingsToolbar({ onNavigate }: { onNavigate: () => void }) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenSettings = () => {
    setIsOpened((prevState) => !prevState);
  };
  return (
    <>
      <MenuOutlinedIcon onClick={handleOpenSettings} fontSize="large" />
      {isOpened && (
        <StyledSettingsToolbar $isOpened={isOpened}>
          <StyledLi>
            <PersonOutlineOutlinedIcon />
            Contacts
          </StyledLi>
          <StyledLi onClick={onNavigate}>
            <SettingsOutlinedIcon />
            Settings
          </StyledLi>
          <StyledLi>
            <NightlightOutlinedIcon />
            Night Mode
            <ThemeToggle />
          </StyledLi>
        </StyledSettingsToolbar>
      )}
    </>
  );
}

export default SettingsToolbar;
