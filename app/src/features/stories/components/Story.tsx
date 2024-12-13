import { STATIC_MEDIA_URL } from "@constants";
import { useEffect, useRef } from "react";
import ModalImage from "react-modal-image";
import styled from "styled-components";

interface StoryProps {
  content: string;
  caption: string;
  isPaused?: boolean;
  isImage: boolean;
  onFinish: () => void;
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  border-radius: var(--border-radius-default);
  width: 100%;
  height: 100vh;

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
const Video = styled.video`
  object-fit: cover;
  border-radius: var(--border-radius-default);
  width: 100%;
`;

const Caption = styled.p<{ $captionLength: number }>`
  position: absolute;
  bottom: ${({ $captionLength }) =>
    `clamp(5%, ${Math.max(2, 8 - $captionLength * 0.01)}vh, 15%)`};
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0.5rem;
  text-align: center;
  width: 100%;
  font-size: ${({ $captionLength }) =>
    `clamp(1rem, ${Math.max(2.5 - $captionLength * 0.02, 1)}vw, 2.5rem)`};
`;

function Story({ content, caption, isPaused, isImage, onFinish }: StoryProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (!isPaused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPaused]);
  return (
    <Container>
      {isImage ? (
        <ModalImage
          small={STATIC_MEDIA_URL + content}
          large={STATIC_MEDIA_URL + content}
          alt={caption}
          hideDownload={true}
          hideZoom={true}
        />
      ) : (
        <Video controls={false} ref={videoRef} onEnded={onFinish}>
          <source src={`${STATIC_MEDIA_URL}${content}`} />
        </Video>
      )}
      {caption && <Caption $captionLength={caption.length}>{caption}</Caption>}
    </Container>
  );
}

export default Story;
