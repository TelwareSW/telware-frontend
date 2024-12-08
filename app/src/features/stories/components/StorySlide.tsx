import { useInView } from "../hooks/useInView";
import { story } from "types/story";
import StorySlideCounter from "./StorySlideCounter";
import UserInfo from "./UserInfo";
import { useCallback, useEffect, useState } from "react";
import { useViewStory } from "../hooks/useViewStory";
import Story from "./Story";
import styled from "styled-components";
import { getElapsedTime } from "utils/helpers";
import StorySliderTooltip from "./StorySliderTooltip";
import { getIcon } from "@data/icons";
import { useDeleteStory } from "../hooks/useDeleteStory";
import CloseButton from "@components/CloseButton";
import Popup from "@components/Popup";

interface StorySlideProps {
  userId?: string;
  name: string;
  photo?: string;
  getNextUserStories: () => void;
  stories: story[];
  onClose: () => void;
}

const Container = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 2;

  width: 100%;
  height: 100%;
  gap: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
`;

const StyledSlide = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 60%;
`;

const NavButton = styled.div<{ isLeft?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ isLeft }) => (isLeft ? "left: 0;" : "right: 0;")}
  transform: translateY(-50%);
  cursor: pointer;

  z-index: 1;

  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
`;

const StyledUserInfo = styled.div`
  position: absolute;
  top: 2rem;
  left: 2.5rem;

  z-index: 1;
`;

const ViewsContainer = styled.div`
  position: absolute;
  height: 4rem;
  font-size: 1.25rem;
  line-height: 4rem;
  padding-left: 1.5rem;

  bottom: 0;
  z-index: 1;
  width: 100%;
  height: 4rem;
  color: white;
  background-color: var(--story-views-background);
  text-align: left;
`;
function StorySlide(props: StorySlideProps) {
  const { photo, name, stories, getNextUserStories, onClose } = props;
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { viewStory } = useViewStory();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { deleteStory } = useDeleteStory();
  const isMine = name === "My Story";

  const handleSlideChange = () => {
    if (index < stories.length - 1) {
      setIndex(index + 1);
    } else {
      getNextUserStories();
      setIndex(0);
    }
    setIsPaused(false);
  };

  const handlePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const handleRightArrow = useCallback(() => {
    if (index < stories.length - 1) {
      setIndex(index + 1);
    } else {
      getNextUserStories();
    }
  }, [index, stories.length, getNextUserStories]);

  const handleEcsKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );
  const handleSpaceKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " ") {
        handlePause();
      }
    },
    [handlePause]
  );
  const handleLeftArrow = useCallback(() => {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      getNextUserStories();
    }
  }, [index, getNextUserStories]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleRightArrow();
      } else if (e.key === "ArrowLeft") {
        handleLeftArrow();
      } else if (e.key === " ") {
        handleSpaceKey(e);
      } else if (e.key === "Escape") {
        handleEcsKey(e);
      }
    },
    [handleRightArrow, handleLeftArrow, handleSpaceKey, handleEcsKey]
  );

  const handleDelete = () => {
    deleteStory(stories[index].id);
    onClose();
  };

  useEffect(() => {
    if (inView && !isMine && stories[index]?.viewed !== true) {
      viewStory(stories[index]?.id);
    }
  }, [inView, stories, index, viewStory, isMine]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!stories.length) {
    return null;
  }
  const isImage =
    stories[index].content.includes(".jpg") ||
    stories[index].content.includes(".png") ||
    stories[index].content.includes(".jpeg") ||
    stories[index].content.includes(".gif") ||
    stories[index].content.includes(".webp") ||
    stories[index].content.includes(".svg") ||
    stories[index].content.includes(".bmp");

  return (
    <Popup isOpen={true} onClose={onClose}>
      <Container>
        <CloseButton onClose={onClose} />
        <StyledSlide ref={ref} className="story">
          <NavButton isLeft onClick={handleLeftArrow}>
            {getIcon("LeftArrow")}
          </NavButton>
          <NavButton onClick={handleRightArrow}>
            {getIcon("RightArrow")}
          </NavButton>
          <StorySlideCounter
            isPaused={isPaused}
            currentIndex={index}
            totalSlides={stories.length}
            onSlideChange={handleSlideChange}
            isImage={isImage}
          />
          <StorySliderTooltip
            isMine={isMine}
            onPause={handlePause}
            isPaused={isPaused}
            onDelete={handleDelete}
          />
          <StyledUserInfo>
            <UserInfo
              name={name}
              photo={photo || ""}
              isVertical={true}
              elapsedTime={getElapsedTime(stories[index].timestamp)}
            />
          </StyledUserInfo>
          <Story
            onFinish={handleSlideChange}
            isPaused={isPaused}
            isImage={isImage}
            content={stories[index].content}
            caption={stories[index].caption || ""}
          />
          {isMine && stories[index].views && (
            <ViewsContainer>
              {stories[index].views.length > 0
                ? `${stories[index].views.length} views`
                : "No views"}
            </ViewsContainer>
          )}
        </StyledSlide>
      </Container>
    </Popup>
  );
}

export default StorySlide;
