import styled, { css } from "styled-components";
import { getIcon } from "../data/icons";

import { iconStrings } from "../data/icons";

interface CircleIconProps {
  $icon: iconStrings;
  $bottom?: number;
  $right?: number;
  $size?: number;
  $padding?: number;
  $color?: string;
  $bgColor?: string;
  onClick?: () => void;
}

const StyledIcon = styled.div<CircleIconProps>`
  ${(props) =>
    (props.$right !== undefined || props.$bottom !== undefined) &&
    css`
      position: absolute;
      right: ${(props) => props.$right ?? 0}rem;
      bottom: ${(props) => props.$bottom ?? 0}rem;
    `};
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  padding: ${(props) => props.$padding}rem;
  background-color: ${(props) => props.$bgColor};
  border-radius: var(--border-radius-circle);
  opacity: 0.9;
  box-shadow: var(--box-shadow);

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  & > svg {
    width: 100%;
    height: 100%;
    color: ${(props) => props.$color};
  }
`;

function CircleIcon({
  $icon,
  $bottom,
  $right,
  $size = 3,
  $padding = 0,
  $color = "var(--color-search-border)",
  $bgColor = "transparent",
  onClick,
}: CircleIconProps) {
  return (
    <StyledIcon
      onClick={onClick}
      {...{ $icon, $bottom, $right, $size, $padding, $color, $bgColor }}
    >
      {getIcon($icon)}
    </StyledIcon>
  );
}

export default CircleIcon;
