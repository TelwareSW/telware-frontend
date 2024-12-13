import { useParams } from "react-router-dom";
import styled from "styled-components";

import RecordInput from "./SendButton";
import ForwardingInputBar from "@features/forward/ForwardingInputBar";
import ScrollableChats from "@features/forward/ScrollableChats";
import Picker from "./emojies/Picker";
import ReplyWrapper from "./ReplyWrapper";
import { useAppSelector } from "@hooks/useGlobalState";
import { getChatByID } from "./utils/helpers";
import VoiceRecorder from "./audio/VoiceRecorder";
import RecordingView from "./audio/RecordingView";
import ChatInputIcons from "./ChatInputIcons";
import FilePreviewItem from "./media/FilePreviewItem";
import useActiveMessage from "./hooks/useActiveMessage";
import { useContext } from "react";
import { ChatInputContext } from "./ChatBox";

const Container = styled.div`
  z-index: 1;

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
  align-self: center;
  flex-direction: column;
  align-content: center;
  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
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
  const { chatId } = useParams<{ chatId: string }>();

  const {
    input,
    setInput,
    file,
    isFilePreviewOpen,
    isRecording,
    error,
    setError,
    isEmojiSelectorOpen,
    handleSubmit,
    showForwardUsers,
    handleClose,
  } = useContext(ChatInputContext);

  const chats = useAppSelector((state) => state.chats.chats);
  const currChat = getChatByID({ chats: chats, chatID: chatId! });

  const showCheckBox = currChat?.showCheckBox;
  const isBlocked = currChat?.isBlocked;

  const { activeMessage } = useActiveMessage({ setInput });

  if (error.length) {
    alert(error);
    setError("");
  }

  return (
    <>
      {isFilePreviewOpen && file && (
        <FilePreviewItem data-testid="file-preview" />
      )}

      {isBlocked ? null : (
        <Container data-testid="chat-input-container">
          {!showCheckBox ? (
            <Input data-testid="chat-input">
              {isEmojiSelectorOpen && <Picker data-testid="emoji-picker" />}
              <InputContainer>
                {activeMessage.id && <ReplyWrapper />}

                <InputWrapper>
                  {isRecording !== "idle" ? (
                    <RecordingView />
                  ) : (
                    <ChatInputIcons />
                  )}
                </InputWrapper>
              </InputContainer>

              {input ? (
                <RecordInput
                  onClick={handleSubmit}
                  type={!input ? "record" : "message"}
                  data-testid="send-button"
                />
              ) : (
                <VoiceRecorder />
              )}
            </Input>
          ) : (
            <ForwardingInputBar data-testid="forwarding-input-bar" />
          )}
          {showForwardUsers && <ScrollableChats onClose={handleClose} />}
        </Container>
      )}
    </>
  );
}

export default ChatInput;
