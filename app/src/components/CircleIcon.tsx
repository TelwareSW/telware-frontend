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
  $opacity?: number;
  onClick?: () => void;
  children?: React.ReactNode;
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
  opacity: ${(props) => props.$opacity};
  box-shadow: var(--box-shadow);

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    scale: 1.05;
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
  $opacity = 0.9,
  onClick,
  children,
}: CircleIconProps) {
  return (
    <StyledIcon
      onClick={onClick}
      {...{
        $icon,
        $bottom,
        $right,
        $size,
        $padding,
        $color,
        $bgColor,
        $opacity,
      }}
    >
      {getIcon($icon)}
      {children}
    </StyledIcon>
  );
}

export default CircleIcon;
