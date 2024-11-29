import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getIcon } from "@data/icons";

import ExpandingTextArea from "@components/ExpandingTextArea";
import Icon from "@components/Icon";
import RecordInput from "./SendButton";

import { setShowCheckBox } from "@state/messages/messages";
import { RootState } from "@state/store";

import ForwardingInputBar from "@features/forward/ForwardingInputBar";
import ScrollableChats from "@features/forward/ScrollableChats";
import { useMessageSender } from "./hooks/useMessageSender";

export const Container = styled.div`
  z-index: 1000;

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
  const { handleSendMessage } = useMessageSender();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    handleSendMessage(input);
    setInput("");
  };

  const showCheckBox = useSelector(
    (state: RootState) => state.messages.showCheckBox
  );

  const [showForwardUsers, setShowForwardUsers] = useState(false);

  function handleClose() {
    setShowForwardUsers(false);
    dispatch(setShowCheckBox({ showCheckBox: false }));
  }
  function handleForward() {
    setShowForwardUsers(true);
  }

  return (
    <Container>
      {!showCheckBox ? (
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
      ) : (
        <ForwardingInputBar onClose={handleClose} onForward={handleForward} />
      )}

      {showForwardUsers && <ScrollableChats onClose={handleClose} />}
    </Container>
  );
}

export default ChatInput;
