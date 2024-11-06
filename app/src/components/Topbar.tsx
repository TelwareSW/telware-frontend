import styled from "styled-components";
import { getIcon } from "@data/icons";
import Avatar from "@features/Chats/Avatar";
import { useChat } from "@features/Chats/hooks/useChat";

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  height: 3.5rem;
  background-color: var(--color-background);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 60%;
`;

const LastSeen = styled.span`
  font-size: 0.875rem;
  line-height: 0.9rem;
  color: var(--color-text-secondary);
`;

const Name = styled.span`
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  font-weight: 500;

  line-height: 1.3125rem;
`;

const Icons = styled.div`
  display: flex;
  gap: 1.5rem;
`;

function Topbar() {

  const { chat } = useChat();

  return (
    <Container>
      <Info>
        <Avatar name="Alice" />
        <Content>
          <Name>{chat?.name}</Name>
          <LastSeen>last seen {chat?.lastSeen}</LastSeen>
        </Content>
      </Info>
      <Icons>
        {getIcon("Call")}
        {getIcon("Search")}
        {getIcon("More")}
      </Icons>
    </Container>
  );
}

export default Topbar;
