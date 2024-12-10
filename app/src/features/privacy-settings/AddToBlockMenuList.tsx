import styled from "styled-components";
import BlockItem, { BlockedUserProps } from "./BlockItem";
import { useBlock } from "./hooks/useBlock";
import { ScrollContainer } from "styles/GlobalStyles";
import { useAppSelector } from "@hooks/useGlobalState";

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

function AddToBlockMenuList({ setIsMenuOpened }: any) {
  const { addToBlockList } = useBlock();

  const members = useAppSelector((state) => state.chats.members);

  function handleClick(item: BlockedUserProps) {
    setIsMenuOpened(false);
    addToBlockList({ id: item.id });
  }

  return (
    <StyledList {...menuStyles}>
      <ScrollContainer>
        {members.length ? (
          members.map((member) => {
            const data: BlockedUserProps = {
              id: member._id,
            };
            return (
              <StylingWrapper
                onClick={() => handleClick(data)}
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
