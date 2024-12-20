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
  onClick?: (e: Event, voiceNoteName?: string) => void;
  children?: React.ReactNode;
  as?: React.ElementType;
  type?: string;
  testid?: string;
}

const StyledCircleIcon = styled.div<CircleIconProps>`
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
    opacity: 1;
    cursor: pointer;
  }
  & > svg {
    width: 100%;
    height: 100%;
    color: ${(props) => props.$color};
  }

  ${(props) =>
    props.as === "button" &&
    css`
      border: none;
      outline: none;
      cursor: pointer;
    `};
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
  as,
  type,
  testid,
}: CircleIconProps) {
  return (
    <StyledCircleIcon
      data-testid={testid}
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
        as,
        type,
      }}
    >
      {getIcon($icon)}
      {children}
    </StyledCircleIcon>
  );
}

export default CircleIcon;
