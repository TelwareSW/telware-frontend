import { MOBILE_VIEW, STATIC_MEDIA_URL } from "@constants";
import useIndexedDB from "@hooks/useIndexedDB";
import { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import styled from "styled-components";

interface StoryProps {
  content: string;
  caption: string;
}
const StyledImageContainer = styled.div`
  position: relative;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-background);
    border-radius: var(--border-radius-default);
    width: 100%;
    height: 100%;
    img {
      width: 100vw;
      height: 100vh;
      object-fit: contain !important;
    }
  }
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 12%,
      transparent 13%,
      transparent 100%
    );
  }
`;
const StyledCaption = styled.p<{ $captionLength: number }>`
  position: absolute;
  bottom: ${({ $captionLength }) =>
    `clamp(5%, ${Math.max(2, 8 - $captionLength * 0.01)}vh, 15%)`};
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  text-align: center;

  font-size: ${({ $captionLength }) =>
    `clamp(1rem, ${Math.max(2.5 - $captionLength * 0.02, 1)}vw, 2.5rem)`};
`;
function Story(props: StoryProps) {
  const { content, caption } = props;
    return (
    <StyledImageContainer>
      <ModalImage
        small={STATIC_MEDIA_URL + content}
        large={STATIC_MEDIA_URL + content}
        alt={caption}
        hideDownload={true}
        hideZoom={true}
      />
      {caption && (
        <StyledCaption $captionLength={caption.length}>{caption}</StyledCaption>
      )}
    </StyledImageContainer>
  );
}

export default Story;
