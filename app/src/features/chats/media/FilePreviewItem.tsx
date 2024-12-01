import styled from "styled-components";
import FileViewer from "./FileViewer";
import Modal from "@components/Modal";
import ExpandingTextArea from "@components/ExpandingTextArea";
import Button from "@components/Button";
import { Dispatch, SetStateAction, useState } from "react";
import FileDetailsBanner from "./FileDetailsBanner";
import { useUploadMedia } from "./hooks/useUploadMedia";

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

interface FileProps {
  file: File | string;
  handleCloseFilePreview: () => void;
  handleSendMessage: (data: string, file: string) => void;
  setFile: Dispatch<SetStateAction<File | null>>;
}

function FilePreviewItem({
  file,
  handleCloseFilePreview,
  handleSendMessage,
  setFile,
}: FileProps) {
  const [caption, setCaption] = useState("");
  const { data: uploadedUrl, mutate: uploadFile, isPending } = useUploadMedia();

  const handleSendFile = async () => {
    if (!file) {
      console.error("No file selected to send.");
      return;
    }

    try {
      uploadFile(file, {
        onSuccess: (url) => {
          console.log("File uploaded successfully:", url);
          handleSendMessage(caption, url);
          setCaption("");
          setFile(null);
        },
        onError: (error) => {
          console.error("Error uploading file:", error);
          alert("Failed to upload the file. Please try again.");
        },
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
        <ExpandingTextArea input={caption} setInput={setCaption} />
        <Button disabled={isPending} onClick={handleSendFile}>
          {isPending ? "Sending..." : "Send"}
        </Button>
      </InputWrapper>
    </Modal>
  );
}

export default FilePreviewItem;
