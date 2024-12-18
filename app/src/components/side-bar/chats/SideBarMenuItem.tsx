import styled from "styled-components";
import { getIcon, iconStrings } from "../../../data/icons";
import { useDispatch } from "react-redux";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";

interface SideBarMenuItemProps {
  title: string;
  children?: React.ReactNode;
  iconMapValue?: iconStrings;
  onClick?: () => void;
}

const StyledMenuItem = styled.li`
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

function SideBarMenuItem({
  title,
  onClick,
  children,
  iconMapValue,
}: SideBarMenuItemProps) {
  return (
    <StyledMenuItem onClick={onClick} data-testid={`side-bar-menu-${title}`}>
      {getIcon(iconMapValue)}
      {title}
      {children}
    </StyledMenuItem>
  );
}
export type { SideBarMenuItemProps };
export default SideBarMenuItem;
