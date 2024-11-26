import { useState } from "react";
import styled from "styled-components";

import { getIcon } from "@data/icons";

import ExpandingTextArea from "@components/ExpandingTextArea";
import Icon from "@components/Icon";
import RecordInput from "./SendButton";
import { useSocket } from "@hooks/useSocket";

const Container = styled.div`
  margin: 0.5rem auto 1rem;

  width: 80%;
  max-width: 600px;

  display: flex;
`;

const InputContainer = styled.div`
  background-color: var(--color-background);

  padding: 0.3125rem 0.6rem;
  border-radius: 1rem;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  flex: 3 auto;

  display: flex;
  align-items: center;
  align-self: center;

  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  position: relative;

  flex: 1;
`;

const Input = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  flex: 1;
`;

function ChatInput() {
  const [input, setInput] = useState("");
  const { sendMessage } = useSocket();

  function handleSubmit() {
    if (input) {
      const message = {
        id: "",
        content: input,
        senderId: "",
        type: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        chatId: "",
        parentMessageId: "",
        isDeleted: false,
        deleteType: 2,
        status: 0,
      };
      setInput("");
      sendMessage(message);
    }
  }

  return (
    <Container>
      <Input>
        <InputContainer>
          <InputWrapper>
            <Icon>{getIcon("Emojie")}</Icon>
            <ExpandingTextArea input={input} setInput={setInput} />
            <Icon>{getIcon("Attatch")}</Icon>
          </InputWrapper>
        </InputContainer>

        <RecordInput
          onClick={handleSubmit}
          type={!input ? "record" : "message"}
        />
      </Input>
    </Container>
  );
}

export default ChatInput;
