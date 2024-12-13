import React from "react";
import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
  height: 35%;
  padding: 8px 16px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--color-text);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FileName = styled.span`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
`;

const FileSize = styled.span`
  font-size: 0.85rem;
  color: #666;
`;

interface FileDetailsBannerProps {
  file: File;
}

function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

const FileDetailsBanner: React.FC<FileDetailsBannerProps> = ({ file }) => {
  return (
    <BannerContainer>
      <FileName title={file.name}>{file.name}</FileName>
      <FileSize>Size: {formatFileSize(file.size)}</FileSize>
    </BannerContainer>
  );
};

export default FileDetailsBanner;
