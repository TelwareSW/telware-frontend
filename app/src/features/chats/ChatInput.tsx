import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getIcon } from "@data/icons";
import ExpandingTextArea from "@components/ExpandingTextArea";
import Icon from "@components/Icon";

import RecordInput from "./SendButton";
import ForwardingInputBar from "@features/forward/ForwardingInputBar";
import ScrollableChats from "@features/forward/ScrollableChats";
import Picker from "./emojies/Picker";
import { useMessageSender } from "./hooks/useMessageSender";
import ReplyWrapper from "./ReplyWrapper";
import { clearActiveMessage } from "@state/messages/activeMessage";
import MediaUploadComponent from "./media/MediaUploadComponent";
import FilePreviewItem from "./media/FilePreviewItem";
import { useAppSelector } from "@hooks/useGlobalState";
import { setShowCheckBox } from "@state/messages/chats";
import { getChatByID } from "./helpers";
import VoiceRecorder, { RecordingStates } from "./audio/VoiceRecorder";
import RecordingView from "./audio/RecordingView";

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
  const activeMessage = useAppSelector((state) => state.activeMessage);
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [isRecording, setIsRecording] = useState<RecordingStates>("idle");
  const [error, setError] = useState<string>("");
  const { chatId } = useParams<{ chatId: string }>();

  useEffect(() => {
    if (activeMessage.state === "edit" && activeMessage?.content)
      setInput(activeMessage?.content);
  }, [activeMessage]);

  const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);
  const { handleSendMessage } = useMessageSender();
  const dispatch = useDispatch();

  const toggleShowEmojies = () => {
    setIsEmojiSelectorOpen((show) => !show);
  };
  const sendGIF = (gif: string) => {
    handleSendMessage("", chatId, gif, "GIF");
    setIsEmojiSelectorOpen(false);
  };

  const sendSticker = (sticker: string) => {
    handleSendMessage("", chatId, sticker, "sticker");
    setIsEmojiSelectorOpen(false);
  };
  const handleSubmit = (e: Event, voiceNoteName = "") => {
    e.preventDefault();
    setIsEmojiSelectorOpen(false);
    if (isRecording !== "idle") return;
    handleSendMessage(input, chatId, voiceNoteName);
    dispatch(clearActiveMessage());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as Event);
    }
  };

  const chats = useAppSelector((state) => state.chats.chats);

  const [showForwardUsers, setShowForwardUsers] = useState(false);

  const currChat = getChatByID({ chats: chats, chatID: chatId! });

  const showCheckBox = currChat?.showCheckBox;
  const isBlocked = currChat?.isBlocked;

  function handleClose() {
    if (!chatId) {
      return;
    }

    setShowForwardUsers(false);
    dispatch(setShowCheckBox({ chatId: chatId, showCheckBox: false }));
  }

  function handleForward() {
    setShowForwardUsers(true);
  }
  function handleCloseFilePreview() {
    setFile(null);
    setIsFilePreviewOpen(false);
  }

  if (error.length) {
    alert(error);
    setError("");
  }

  return (
    <>
      {isFilePreviewOpen && file && (
        <FilePreviewItem
          file={file}
          handleCloseFilePreview={handleCloseFilePreview}
          handleSendMessage={handleSendMessage}
          setFile={setFile}
          data-testid="file-preview"
        />
      )}

      {isBlocked ? null : (
        <Container data-testid="chat-input-container">
          {!showCheckBox ? (
            <Input data-testid="chat-input">
              {isEmojiSelectorOpen && (
                <Picker
                  setInputText={setInput}
                  data-testid="emoji-picker"
                  onSendGIF={sendGIF}
                  onSendSticker={sendSticker}
                />
              )}
              <InputContainer>
                {activeMessage.id && <ReplyWrapper setInput={setInput} />}

                <InputWrapper>
                  {isRecording !== "idle" ? (
                    <RecordingView
                      setIsRecording={setIsRecording}
                      isRecording={isRecording}
                    />
                  ) : (
                    <>
                      <InvisibleButton
                        onClick={toggleShowEmojies}
                        data-testid="emoji-button"
                      >
                        <Icon>{getIcon("Emojie")}</Icon>
                      </InvisibleButton>

                      <ExpandingTextArea
                        input={input}
                        setInput={setInput}
                        onKeyDown={handleKeyDown}
                      />

                      <MediaUploadComponent
                        file={file}
                        setFile={setFile}
                        setIsFilePreviewOpen={setIsFilePreviewOpen}
                      />
                    </>
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
                <VoiceRecorder
                  isRecording={isRecording}
                  setIsRecording={setIsRecording}
                  setError={setError}
                  handleSendMessage={handleSendMessage}
                />
              )}
            </Input>
          ) : (
            <ForwardingInputBar
              onClose={handleClose}
              onForward={handleForward}
              data-testid="forwarding-input-bar"
            />
          )}
          {showForwardUsers && <ScrollableChats onClose={handleClose} />}
        </Container>
      )}
    </>
  );
}

export default ChatInput;
