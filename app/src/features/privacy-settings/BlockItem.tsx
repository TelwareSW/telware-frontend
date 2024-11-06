import Heading from "@components/Heading";
import Avatar from "@features/chats/Avatar";
import styled from "styled-components";

const StyledSideBarRow = styled.div`
  height: 4rem;

  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  padding-left: 5%;
  padding-right: 5%;

  &:hover {
    background: var(--color-background-compact-menu-hover);
    cursor: pointer;
  }

  border-radius: var(--border-radius-modal);
`;

const RowInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  gap: 0.5rem;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const StyledP = styled.p`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

interface BlockedUserProps {
  id: number;
  name: string;
  username: string;
}

function BlockItem({ name, username }: BlockedUserProps) {
  return (
    <StyledSideBarRow>
      <RowInfo>
        <Avatar name={name} />
        <InnerDiv>
          <Heading as="h5">{name}</Heading>
          <StyledP>{`@${username}`}</StyledP>
        </InnerDiv>
      </RowInfo>
    </StyledSideBarRow>
  );
}

export default BlockItem;
export type { BlockedUserProps };
