import styled from "styled-components";
import { getIcon } from "../data/icons";

interface SideBarMenuItemProps {
  title: string;
  children?: React.ReactNode;
  onClick: () => void;
}

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

function SideBarMenuItem({ title, onClick, children }: SideBarMenuItemProps) {
  return (
    <StyledLi onClick={onClick}>
      {getIcon(title)}
      {title}
      {children}
    </StyledLi>
  );
}

export default SideBarMenuItem;
