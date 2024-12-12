import ExpandingTextArea from "@components/ExpandingTextArea";
import { getIcon } from "@data/icons";
import styled from "styled-components";
import MediaUploadComponent from "./media/MediaUploadComponent";
import Icon from "@components/Icon";
import { useContext } from "react";
import { ChatInputContext } from "./ChatBox";

const InvisibleButton = styled.button`
  all: unset;
  display: inline-block;
  cursor: pointer;
`;

function ChatInputIcons() {
  const {
    setIsEmojiSelectorOpen,
    handleSubmit,
    input,
    setInput,
    file,
    setFile,
    setIsFilePreviewOpen,
  } = useContext(ChatInputContext);

  const toggleShowEmojies = () => {
    setIsEmojiSelectorOpen((show: boolean) => !show);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as Event);
    }
  };

  return (
    <>
      <InvisibleButton
        onClick={() => toggleShowEmojies()}
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
  );
}

export default ChatInputIcons;
