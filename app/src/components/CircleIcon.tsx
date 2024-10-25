import styled, { css } from "styled-components";
import { getIcon } from "../data/icons";

interface CircleIconProps {
  icon: string;
  bottom?: number;
  right?: number;
  size?: number;
  padding?: number;
  color?: string;
  bgColor?: string;
  onClick?: () => void;
}

const StyledIcon = styled.div<CircleIconProps>`
  ${(props) =>
    (props.right !== undefined || props.bottom !== undefined) &&
    css`
      position: absolute;
      bottom: ${(props) => props.bottom ?? 0}rem;
      right: ${(props) => props.right ?? 0}rem;
    `};
  width: ${(props) => props.size}rem;
  height: ${(props) => props.size}rem;
  padding: ${(props) => props.padding}rem;
  background-color: ${(props) => props.bgColor};
  border-radius: var(--border-radius-circle);
  opacity: 0.8;
  box-shadow: 0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.215);

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  & > svg {
    width: 100% !important;
    height: 100% !important;
    color: ${(props) => props.color};
  }
`;

function CircleIcon({
  icon,
  bottom,
  right,
  size = 3,
  padding = 0,
  color = "var(--color-search-border)",
  bgColor = "transparent",
  onClick,
}: CircleIconProps) {
  return (
    <StyledIcon
      onClick={onClick}
      {...{ icon, bottom, right, size, padding, color, bgColor }}
    >
      {getIcon(icon)}
    </StyledIcon>
  );
}

export default CircleIcon;
