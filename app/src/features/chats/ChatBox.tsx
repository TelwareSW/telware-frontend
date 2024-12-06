import styled from "styled-components";

import ChatInput from "@features/chats/ChatInput";
import Topbar from "@features/chats/Topbar";
import ChatBody from "./ChatBody";

import { useCloseChat } from "@hooks/useCloseChat";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

function ChatBox() {
  useCloseChat();

  return (
    <Container>
      <Topbar />
      <ChatBody />
      <ChatInput />
    </Container>
  );
}

export default ChatBox;
