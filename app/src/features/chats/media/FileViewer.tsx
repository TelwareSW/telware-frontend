import React from "react";
import styled from "styled-components";

const ViewerContainer = styled.div`
  padding: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #555;
`;

interface FileViewerProps {
  file: File | string;
}

function getFileType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (!extension) return "unknown";

  const imageTypes = ["png", "jpg", "jpeg", "gif", "bmp"];
  const videoTypes = ["mp4", "webm"];
  const audioTypes = ["mp3", "wav"];
  const pdfTypes = ["pdf"];

  if (imageTypes.includes(extension)) return "image";
  if (videoTypes.includes(extension)) return "video";
  if (audioTypes.includes(extension)) return "audio";
  if (pdfTypes.includes(extension)) return "pdf";

  return "unknown";
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  const isFileObject = file instanceof File;
  const fileName = isFileObject
    ? (file as File).name
    : (file as string).split("/").pop() || "";
  const fileType = getFileType(fileName);
  const fileURL = isFileObject
    ? URL.createObjectURL(file as File)
    : (file as string);

  let renderFilePreview;
  switch (fileType) {
    case "image":
      renderFilePreview = (
        <img
          src={fileURL}
          alt="Preview"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      );
      break;

    case "video":
      renderFilePreview = (
        <video controls style={{ width: "100%", height: "100%" }}>
          <source src={fileURL} type={`video/${fileName.split(".").pop()}`} />
          Your browser does not support the video tag.
        </video>
      );
      break;

    case "audio":
      renderFilePreview = (
        <audio controls>
          <source src={fileURL} type={`audio/${fileName.split(".").pop()}`} />
          Your browser does not support the audio tag.
        </audio>
      );
      break;

    case "pdf":
      renderFilePreview = (
        <iframe
          src={fileURL}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="PDF Preview"
        />
      );
      break;

    default:
      renderFilePreview = <Message>Unsupported file type: {fileName}</Message>;
      break;
  }

  return <ViewerContainer>{renderFilePreview}</ViewerContainer>;
};

export default FileViewer;
