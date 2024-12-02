import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getIcon } from "@data/icons";
import ExpandingTextArea from "@components/ExpandingTextArea";
import Icon from "@components/Icon";
import { RootState } from "@state/store";
import { setShowCheckBox } from "@state/messages/messages";
import RecordInput from "./SendButton";
import ForwardingInputBar from "@features/forward/ForwardingInputBar";
import ScrollableChats from "@features/forward/ScrollableChats";
import EmojiPickerItem from "./emojies/EmojiPicker";
import { useMessageSender } from "./hooks/useMessageSender";
import ReplyWrapper from "./ReplyWrapper";
import { clearActiveMessage } from "@state/messages/activeMessage";
import MediaUploadComponent from "./media/MediaUploadComponent";
import FilePreviewItem from "./media/FilePreviewItem";
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
  /* align-items: center; */
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
  const activeMessage = useSelector((state: RootState) => state.activeMessage);
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | string>(null);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [isRecording, setIsRecording] = useState<RecordingStates>("idle");
  const [error, setError] = useState<string>("");
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

  const handleSubmit = (e: Event, voiceNoteName = "") => {
    handleSendMessage(input, voiceNoteName);
    dispatch(clearActiveMessage());
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
  function handleCloseFilePreview() {
    setFile(null);
    setIsFilePreviewOpen(false);
  }

  if (error) {
    alert(error);
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
      <Container data-testid="chat-input-container">
        {!showCheckBox ? (
          <Input data-testid="chat-input">
            {isEmojiSelectorOpen && (
              <EmojiPickerItem
                setInputText={setInput}
                data-testid="emoji-picker"
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

                    <ExpandingTextArea input={input} setInput={setInput} />

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
    </>
  );
}

export default ChatInput;
