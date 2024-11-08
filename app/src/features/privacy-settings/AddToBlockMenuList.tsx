import styled from "styled-components";
import BlockItem, { BlockedUserProps } from "./BlockItem";
import { useBlock } from "./hooks/useBlock";
import { ScrollContainer } from "styles/GlobalStyles";
import { useChats } from "@features/chats/hooks/useChats";
import { Chat } from "@mocks/data/chats";

const StyledList = styled.ul<StyledListProps>`
  position: absolute;
  width: ${(props) => props.$size}%;
  right: ${(props) => (props.$right ?? 3) + 2}rem;
  bottom: ${(props) => (props.$bottom ?? 3) + 3}rem;
  height: ${(props) => (props.$height ?? 3) + 3}rem;
  z-index: 1;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: start;
  list-style: none;
  padding: 0.2rem 0.2rem;
  background-color: var(--color-background);
  box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius-default);
`;

interface StyledListProps {
  $bottom?: number;
  $right?: number;
  $size?: number;
  $height?: number;
}

const menuStyles: StyledListProps = {
  $bottom: 5,
  $right: 4,
  $size: 70,
  $height: 30,
};

const StylingWrapper = styled.div`
  width: 100%;
`;

function filterChats(blockList: BlockedUserProps[], chats: Chat[]) {
  const blockIds = blockList
    ? new Set(blockList.map((val) => val.id))
    : new Set();
  const filteredChats = chats?.filter((item) => !blockIds.has(item.id));

  return filteredChats;
}

function AddToBlockMenuList({ setIsMenuOpened }: any) {
  const { addToBlockList } = useBlock();

  const { blockList } = useBlock();
  const { chats } = useChats();

  const filteredChats = filterChats(
    blockList as BlockedUserProps[],
    chats as Chat[]
  );

  function handleClick(item: Chat) {
    setIsMenuOpened(false);
    addToBlockList({ id: item.id.toString() });
  }

  return (
    <StyledList {...menuStyles}>
      <ScrollContainer>
        {filteredChats?.map((item) => {
          const data: BlockedUserProps = {
            name: item.name,
            id: item.id,
            username: item.name.toLowerCase() + 123,
          };
          return (
            <StylingWrapper
              onClick={() => handleClick(item)}
              key={data.id}
              data-testid={`block-user-${data.id}`}
            >
              <BlockItem {...data} />
            </StylingWrapper>
          );
        })}
      </ScrollContainer>
    </StyledList>
  );
}

export default AddToBlockMenuList;
export { StyledList };
export type { StyledListProps };
