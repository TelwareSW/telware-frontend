import { useEffect } from "react";
import { useInView } from "../hooks/useInView";
import { story } from "types/story";
import { useViewStory } from "../hooks/useViewStory";
import styled from "styled-components";
import { STATIC_MEDIA_URL } from "@constants";
import ModalImage from "react-modal-image";
import StorySlideCounter from "./StorySlideCounter";
import UserInfo from "./UserInfo";

interface StorySlideProps {
  storyId: string;
  content: string;
  caption: string;
  userId?: string;
  name: string;
  timestamp: number;
  avatar?: string;
  index: number;
  onView: () => void;
  stories: story[];
}

const StyledImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  object-fit: cover;
`;
function StorySlide({
  storyId,
  content,
  caption,
  avatar,
  name,
  timestamp,
  onView,
}: StorySlideProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { viewStory } = useViewStory(storyId);
  const pauseStory = () => {};
  useEffect(() => {
    if (inView) {
      viewStory();
    }
  }, [inView, storyId, viewStory]);
  useEffect(() => {
    const interval = setInterval(() => {
      onView();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div ref={ref} className="story">
      <StorySlideCounter />
      <UserInfo
        name={name}
        avatar={avatar || ""}
        elapsedTime={(new Date().getTime() - Number(timestamp)).toString()}
      />

      <StyledImageContainer onClick={pauseStory}>
        <ModalImage
          small={STATIC_MEDIA_URL + content}
          large={STATIC_MEDIA_URL + content}
          alt={caption}
          hideDownload={true}
          hideZoom={true}
        />
        <p>{caption}</p>
      </StyledImageContainer>
    </div>
  );
}

export default StorySlide;
