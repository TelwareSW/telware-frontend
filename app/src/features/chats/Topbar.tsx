import styled from "styled-components";

import { getIcon } from "@data/icons";

import Avatar from "@features/chats/Avatar";
import Icon from "@components/Icon";

import { useChat } from "@features/chats/hooks/useChat";

const Container = styled.div`
  /* position: absolute;
  top: 0;
  z-index: 1000;

  height: 3.5rem; */
  width: 100%;

  background-color: var(--color-background);

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
  align-items: center;

  gap: 1.5rem;
`;

function Topbar() {
  const { chat } = useChat();
  const { name, lastSeen, image } = chat || {};

  if (!chat) return;

  return (
    <Container>
      <Info>
        <Avatar image={image} name={name?.charAt(0)} />
        <Content>
          <Name>{name}</Name>
          <LastSeen>last seen {lastSeen}</LastSeen>
        </Content>
      </Info>
      <Icons>
        <Icon>{getIcon("Call")}</Icon>
        <Icon>{getIcon("Search")}</Icon>
        <Icon>{getIcon("More")}</Icon>
      </Icons>
    </Container>
  );
}

export default Topbar;
