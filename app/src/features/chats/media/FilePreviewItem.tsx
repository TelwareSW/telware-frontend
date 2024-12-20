import styled from "styled-components";
import FileViewer from "./FileViewer";
import Modal from "@components/Modal";
import ExpandingTextArea from "@components/ExpandingTextArea";
import Button from "@components/Button";
import { useContext, useState } from "react";
import FileDetailsBanner from "./FileDetailsBanner";
import { useUploadMedia } from "./hooks/useUploadMedia";
import { useMessageSender } from "../hooks/useMessageSender";
import { ChatInputContext } from "../ChatBox";

const FileViewerContainer = styled.div`
  z-index: 7;
  min-width: fit-content;
  height: fit-content;
  padding: 4px;
  background: var(--color-secondary);
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding: 4px;
  position: relative;
  flex: 1;
`;

const StyledBackground = styled.div`
  border: 1px solid var(--color-text-secondary);
  background-color: var(--color-background);
  border-radius: 5px;
  padding: 0.25rem;
  width: calc(100% - 5.6rem);
  height: 2.5rem;
  & > textarea {
    width: 100%;
  }
`;

function FilePreviewItem({ chatId }: { chatId: string | undefined }) {
  const [caption, setCaption] = useState("");
  const { mutate: uploadFile, isPending } = useUploadMedia();

  const { file, handleCloseFilePreview, setFile } =
    useContext(ChatInputContext);
  const { handleSendMessage } = useMessageSender();

  const handleSendFile = async () => {
    if (!file) {
      console.error("No file selected to send.");
      return;
    }

    try {
      uploadFile(file, {
        onSuccess: (url) => {
          console.log("File uploaded successfully:", url);
          handleSendMessage(caption, chatId, url);
          setCaption("");
          setFile(null);
        },
        onError: (error) => {
          console.error("Error uploading file:", error);
          alert("Failed to upload the file. Please try again.");
        }
      });
    } catch (error) {
      console.error("Unexpected error while sending file:", error);
      alert("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleCloseFilePreview}
      title="Send File"
      message=""
    >
      <FileViewerContainer>
        <FileViewer file={file} />
      </FileViewerContainer>
      <FileDetailsBanner file={file} />
      <InputWrapper>
        <StyledBackground>
          <ExpandingTextArea input={caption} setInput={setCaption} />
        </StyledBackground>
        <Button disabled={isPending} onClick={handleSendFile}>
          {isPending ? "Sending..." : "Send"}
        </Button>
      </InputWrapper>
    </Modal>
  );
}

export default FilePreviewItem;
