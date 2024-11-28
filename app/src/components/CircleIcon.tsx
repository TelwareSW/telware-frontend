import styled, { css } from "styled-components";
import { getIcon, iconStrings } from "@data/icons";

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
  right: ${(props) => props.$right}rem;
  bottom: ${(props) => props.$bottom}rem;
  ${(props) =>
    (props.$right !== undefined || props.$bottom !== undefined) &&
    css`
      position: absolute;
    `};
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  padding: ${(props) => props.$padding}rem;
  background-color: ${(props) => props.$bgColor};
  border-radius: var(--border-radius-circle);
  opacity: 0.9;
  box-shadow: var(--box-shadow);
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
    width: 100%;
    height: 100%;
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
