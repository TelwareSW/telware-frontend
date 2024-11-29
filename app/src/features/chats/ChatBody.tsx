import styled from "styled-components";
import { useSelector } from "react-redux";

import { RootState } from "@state/store";
import Message from "./Message";

const ScrollContainer = styled.div`
  width: 100%;
  height: 87dvh;
  overflow-y: auto;
  position: relative;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: inherit;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--scrollbar-color);
    border-radius: 5px;
  }

  scroll-behavior: smooth;

  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 10px;
`;

function ChatBody() {
  const messages = useSelector((state: RootState) => state.messages.messages);

  return (
    <ScrollContainer>
      {messages.map((data, index) => {
        return (
          <Message
            key={index}
            index={index}
            messagesLength={messages.length}
            data={data}
          />
        );
      })}
    </ScrollContainer>
  );
}

export default ChatBody;
