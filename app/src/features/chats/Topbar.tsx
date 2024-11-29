import { useState } from "react";
import styled from "styled-components";

import Avatar from "@features/chats/Avatar";
import { useChat } from "@features/chats/hooks/useChat";
import { getIcon } from "@data/icons";
import Icon from "@components/Icon";
import SearchBar from "@features/search/components/SearchBar";
import PinnedMessages from "@features/pin-messages/components/PinnedMessages";

const Container = styled.div`
  position: absolute;
  top: 0;

  z-index: 2;


  height: 3.5rem;
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

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Topbar() {
  const { chat } = useChat();
  const { name, lastSeen, image } = chat || {};
  const [isSearching, setIsSearching] = useState(false);

  if (!chat) return null;

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  return (
    <Container>
      <Avatar image={image} name={name?.charAt(0)} />
      {isSearching ? (
        <SearchBar onClose={toggleSearch} />
      ) : (
        <>
          <Info>
            <Content>
              <Name>{name}</Name>
              <LastSeen>last seen {lastSeen}</LastSeen>
            </Content>
          </Info>
          <PinnedMessages />
          <Icons>
            <Icon>{getIcon("Call")}</Icon>
            <IconButton onClick={toggleSearch}>{getIcon("Search")}</IconButton>
            <Icon>{getIcon("More")}</Icon>
          </Icons>
        </>
      )}
      {isSearching && <IconButton>{getIcon("CalendarToday")}</IconButton>}
    </Container>
  );
}

export default Topbar;
