import styled from "styled-components";
import { getIcon } from "../data/icons";
const StyledIcon = styled.div<{
  $bottom: number;
  $right: number;
  $size: number;
  $color: string;
  $bgColor?: string;
  padding?: string;
}>`
  position: absolute;
  bottom: ${(props) => props.$bottom};
  right: ${(props) => props.$right};
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  padding: ${(props) => props.$padding}rem;
  background-color: ${(props) => props.$bgColor};
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
    color: ${(props) => props.$color};
  }
`;

interface Props {
  icon: string;
  bottom?: number;
  right?: number;
  size?: number;
  padding?: number;
  color?: string;
  bgColor?: string;
  onClick: () => void;
}

function CircleIcon({
  icon,
  bottom = 1,
  right = 1,
  size = 3,
  color = "var(--color-search-border)",
  bgColor = "transparent",
  padding = "0",
  onClick,
}: Props) {
  return (
    <StyledIcon
      onClick={onClick}
      $bottom={bottom}
      $padding={padding}
      $right={right}
      $size={size}
      $bgColor={bgColor}
      $color={color}
    >
      {getIcon(icon)}
    </StyledIcon>
  );
}

export default CircleIcon;
