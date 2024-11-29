import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getIcon } from "@data/icons";

import ExpandingTextArea from "@components/ExpandingTextArea";
import Icon from "@components/Icon";
import RecordInput from "./SendButton";

import { addMessage } from "@state/messages/messages";
import { RootState } from "@state/store";

import { useSocket } from "@hooks/useSocket";
import EmojiPickerItem from "./emojies/EmojiPicker";

const Container = styled.div`
  position: absolute;
  bottom: 3%;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  margin: auto;

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
const InvisibleButton = styled.button`
  all: unset;
  display: inline-block;
  cursor: pointer;
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
  const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);

  const { sendMessage } = useSocket();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.userInfo.id);
  const toggleShowEmojies = () => {
    setIsEmojiSelectorOpen((show) => !show);
  };
  function handleSubmit() {
    console.log("sending message");

    if (input) {
      const message = {
        id: "19008",
        content: input,
        senderId: userId,
        type: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        chatId: "",
        parentMessageId: "",
        isDeleted: false,
        deleteType: 2,
        status: 0,
      };
      setInput("");
      sendMessage(message);
      dispatch(addMessage(message));
    }
  }

  return (
    <Container>
      {isEmojiSelectorOpen && <EmojiPickerItem setInputText={setInput} />}
      <Input>
        <InputContainer>
          <InputWrapper>
            <InvisibleButton onClick={toggleShowEmojies}>
              <Icon>{getIcon("Emojie")}</Icon>
            </InvisibleButton>

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
