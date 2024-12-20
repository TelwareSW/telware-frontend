import styled from "styled-components";

import ChatInput from "@features/chats/ChatInput";
import Topbar from "@features/chats/Topbar";
import ChatBody from "./ChatBody";

import { useCloseChat } from "@hooks/useCloseChat";
import { createContext } from "react";
import useChatInput from "./hooks/useChatInput";
import useShowForward from "@features/forward/hooks/useShowForward";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const ChatInputContext = createContext<any>(null);

function ChatBox() {
  useCloseChat();

  const chatInputData = useChatInput();
  const forwardData = useShowForward();
  return (
    <Container>
      <Topbar />
      <ChatBody />
      <ChatInputContext.Provider value={{ ...chatInputData, ...forwardData }}>
        <ChatInput />
      </ChatInputContext.Provider>
    </Container>
  );
}

export default ChatBox;
