import { useState } from "react";
import styled from "styled-components";
import SideBarMenuItem, { SideBarMenuItemProps } from "./SideBarMenuItem";
import CircleIcon from "../../CircleIcon";
import { useMouseLeave } from "hooks/useMouseLeave";

interface StyledListProps {
  $bottom?: number;
  $right?: number;
  $size?: number;
}
const items: SideBarMenuItemProps[] = [
  { title: "New Channel", iconMapValue: "NewChannel" },
  { title: "New Group", iconMapValue: "NewGroup" },
  { title: "New Chat", iconMapValue: "NewChat" },
];
const menuStyles: StyledListProps = {
  $bottom: 5,
  $right: 1.25,
  $size: 10,
};

const StyledList = styled.ul<StyledListProps>`
  position: absolute;
  width: ${(props) => props.$size}rem;

  right: ${(props) => (props.$right ?? 3) + 2}rem;

  bottom: ${(props) => (props.$bottom ?? 3) + 3}rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  list-style: none;
  padding: 0.5rem 0.2rem;
  background-color: var(--color-background);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius-default);
`;

function StartNewChat() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const ref = useMouseLeave(() => setIsMenuOpened(false), false);
  const handleOpenMenu = () => {
    setIsMenuOpened((prevState) => !prevState);
  };
  return (
    <>
      <CircleIcon
        data-testid="start-new-chat-icon"
        $icon={isMenuOpened ? "Close" : "Edit"}
        $right={1.25}
        $bottom={5}
        $size={2.8}
        $padding={0.5}
        $color="var(--color-icon-secondary)"
        $bgColor="var(--color-pattern)"
        onClick={handleOpenMenu}
      />
      {isMenuOpened && (
        <StyledList
          {...menuStyles}
          data-testid="start-new-chat-menu"
          ref={ref as React.RefObject<HTMLUListElement>}
        >
          {items.map((item: SideBarMenuItemProps, id: number) => (
            <SideBarMenuItem
              data-testid={`new-chat-menu-item-${id}`}
              {...item}
              key={id}
            />
          ))}
        </StyledList>
      )}
    </>
  );
}
export default StartNewChat;
