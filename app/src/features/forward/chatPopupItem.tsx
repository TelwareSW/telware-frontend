import Heading from "@components/Heading";
import Avatar from "@features/chats/Avatar";
import styled from "styled-components";

const StyledSideBarRow = styled.div`
  width: 98%;
  height: 4.5rem;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 5%;
  gap: 1rem;
  background: var(--color-background);
  border-radius: var(--border-radius-modal);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: var(--color-background-compact-menu-hover);
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const RowInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1rem;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const StyledP = styled.p`
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin: 0;
  font-weight: 350;
  letter-spacing: 0.5px;
`;

const FancyAvatar = styled(Avatar)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a5acd, #1e90ff);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

export interface ChatPopupItemProps {
  id: string;
  name: string;
  username: string;
}

function ChatPopupItem({ name, username }: ChatPopupItemProps) {
  return (
    <StyledSideBarRow>
      <RowInfo>
        <FancyAvatar name={name[0]} />
        <InnerDiv>
          <Heading as="h5">{name}</Heading>
          <StyledP>{`@${username}`}</StyledP>
        </InnerDiv>
      </RowInfo>
    </StyledSideBarRow>
  );
}

export default ChatPopupItem;
