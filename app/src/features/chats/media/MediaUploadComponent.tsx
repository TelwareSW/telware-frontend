import { ChangeEvent, useRef } from "react";
import styled from "styled-components";
import { getIcon } from "@data/icons";
import Icon from "@components/Icon";

const InvisibleButton = styled.div`
  all: unset;
  display: inline-block;
  cursor: pointer;
`;
interface ChildProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setIsFilePreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MediaUploadComponent({
  file,
  setFile,
  setIsFilePreviewOpen
}: ChildProps) {
  const fileInput = useRef(null);

  const onAddFile = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("file");
    if (e.target.files) {
      console.log("file", e.target.files[0]);
      setFile(e.target.files[0]);
      event.target.value = "";
    }

    setIsFilePreviewOpen(true);
  };

  return (
    <>
      <InvisibleButton>
        <input
          type="file"
          multiple={false}
          ref={fileInput}
          onChange={onAddFile}
          style={{ display: "none" }}
          data-testid="file-input"
        />
        <Icon
          data-testid="upload-media-button"
          onClick={() => fileInput.current?.click()}
        >
          {getIcon("Attatch")}
        </Icon>
      </InvisibleButton>
    </>
  );
}
