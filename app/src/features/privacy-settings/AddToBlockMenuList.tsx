import styled from "styled-components";
import BlockItem, { BlockedUserProps } from "./BlockItem";
import { useBlock } from "./hooks/useBlock";
import { ScrollContainer } from "styles/GlobalStyles";
import { useAppSelector } from "@hooks/useGlobalState";
import { DetailedChatInterface } from "@state/messages/chats";
import { useChatMembers } from "@features/chats/hooks/useChatMember";

const StyledList = styled.ul<StyledListProps>`
  position: absolute;
  width: 70%;
  right: 20%;
  bottom: ${(props) => (props.$bottom ?? 3) + 3}rem;
  height: fit-content;
  max-height: ${(props) => (props.$height ?? 3) + 3}rem;
  min-height: 3rem;
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
  $height?: number;
}

const menuStyles: StyledListProps = {
  $bottom: 5,
  $height: 30,
};

const StylingWrapper = styled.div`
  width: 100%;
`;

const StyledP = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  justify-self: center;
  align-self: center;
`;
function filterChats(
  blockList: BlockedUserProps[],
  chats: DetailedChatInterface[]
) {
  const blockIds = blockList
    ? new Set(blockList.map((val) => val.id))
    : new Set();
  const filteredChats = chats?.filter((item) => !blockIds.has(item._id));

  return filteredChats;
}

function AddToBlockMenuList({ setIsMenuOpened }: any) {
  const { addToBlockList } = useBlock();

  const { blockList } = useBlock();
  const chats = useAppSelector((state) => state.chats.chats);

  const filteredChats = filterChats(
    blockList as BlockedUserProps[],
    chats as DetailedChatInterface[]
  );

  function handleClick(item: DetailedChatInterface) {
    setIsMenuOpened(false);
    addToBlockList({ id: item._id });
  }

  return (
    <StyledList {...menuStyles}>
      <ScrollContainer>
        {filteredChats.length ? (
          filteredChats.map((item) => {
            const membersData = useChatMembers(item.members);

            const data: BlockedUserProps = {
              id: item._id,
              name:
                membersData[0].screenFirstName +
                " " +
                membersData[0].screenLastName,
              username: membersData[0].username,
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
          })
        ) : (
          <StyledP>No Unblocked users found</StyledP>
        )}
      </ScrollContainer>
    </StyledList>
  );
}

export default AddToBlockMenuList;
export { StyledList };
export type { StyledListProps };
