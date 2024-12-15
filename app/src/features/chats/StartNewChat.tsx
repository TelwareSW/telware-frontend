import { useState } from "react";
import styled from "styled-components";
import SideBarMenuItem, {
  SideBarMenuItemProps,
} from "@components/side-bar/chats/SideBarMenuItem";
import CircleIcon from "@components/CircleIcon";
import { useMouseLeave } from "@hooks/useMouseLeave";
import { useDispatch } from "react-redux";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";
import { useSidebarType } from "@components/side-bar/SideBarContext";

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

const StyledCircleIconContainer = styled.div`
  cursor: pointer;
  position: relative;
  height: 3.5rem;
  width: 3.5rem;
`;
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
  const dispatch = useDispatch();
  const sideBarType = useSidebarType();

  const handleOpenMenu = () => {
    setIsMenuOpened((prevState) => !prevState);
  };

  function handleMenuItemClick(title: string) {
    if (title === "New Channel") {
      dispatch(
        updateSideBarView({
          redirect: sideBarPages.ADD_MEMBERS,
          data: { type: sideBarType },
        })
      );
    } else if (title === "New Group") {
      dispatch(
        updateSideBarView({
          redirect: sideBarPages.ADD_MEMBERS,
          data: { type: sideBarType },
        })
      );
    } else {
      //TODO: implemn
    }
  }

  return (
    <>
      <StyledCircleIconContainer>
        <CircleIcon
          data-testid="start-new-chat-icon"
          $icon={isMenuOpened ? "Close" : "Edit"}
          $right={0.5}
          $bottom={0}
          $size={2.8}
          $padding={0.5}
          $color="var(--color-icon-secondary)"
          $bgColor="var(--new-chat-color)"
          $opacity={0.95}
          onClick={handleOpenMenu}
        />
      </StyledCircleIconContainer>
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
              onClick={() => handleMenuItemClick(item?.title)}
            />
          ))}
        </StyledList>
      )}
    </>
  );
}
export default StartNewChat;
