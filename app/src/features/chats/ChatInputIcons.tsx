import ExpandingTextArea from "@components/ExpandingTextArea";
import { getIcon } from "@data/icons";
import styled from "styled-components";
import MediaUploadComponent from "./media/MediaUploadComponent";
import Icon from "@components/Icon";
import React, { useContext } from "react";
import { ChatInputContext } from "./ChatBox";

const InvisibleButton = styled.div`
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
    setIsFilePreviewOpen
  } = useContext(ChatInputContext);

  const toggleShowEmojies = () => {
    setIsEmojiSelectorOpen((show: boolean) => !show);
  };

  const handleKeyDown = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setIsEmojiSelectorOpen(false);
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as Event);
    }
  };
  const handleSetFile = (file: File) => {
    setIsEmojiSelectorOpen(false);
    setFile(file);
    setIsFilePreviewOpen(true);
  };

  return (
    <>
      <InvisibleButton>
        <Icon data-testid="Emojie-button" onClick={() => toggleShowEmojies()}>
          {getIcon("Emojie")}
        </Icon>
      </InvisibleButton>

      <ExpandingTextArea
        input={input}
        setInput={setInput}
        onKeyDown={handleKeyDown}
      />

      <MediaUploadComponent
        file={file}
        setFile={handleSetFile}
        setIsFilePreviewOpen={setIsFilePreviewOpen}
      />
    </>
  );
}

export default ChatInputIcons;
