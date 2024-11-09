import { useState } from "react";
import StoryList from "./StoryList";
import styled from "styled-components";
import { useStroies } from "../hooks/useStories";
import { useMyStroies } from "../hooks/useMyStories";
import { useAppSelector } from "@hooks/useGlobalState";
import CollapsedStoryList from "./CollapsedStoryList";
import { useMouseLeave } from "@hooks/useMouseLeave";

const StyledContainer = styled.div<{ $isOpened: boolean }>`
  position: absolute;
  width: ${(props) => (props.$isOpened ? "96.5%" : "2rem")};
  left: ${(props) => (props.$isOpened ? "1rem" : "22.5rem")};
  top: ${(props) => (props.$isOpened ? "4rem" : 0)};
  background-color: ${(props) =>
    props.$isOpened ? "var(--background-color)" : "transparent"};
  margin: 0 -2.5%;
  height: 4rem;
  z-index: 100;
`;

function StoryListContainer() {
  const [isOpened, setIsOpened] = useState(false);
  const { data: userStoriesData } = useStroies();
  const userStories = userStoriesData?.data;

  const { data: myStoriesData } = useMyStroies();
  const myStories = myStoriesData?.data;
  const { userInfo } = useAppSelector((state) => state.user);

  const ref = useMouseLeave(() => setIsOpened(false), false);

  const handleOpen = () => {
    setIsOpened(true);
  };
  return (
    <StyledContainer
      ref={ref as React.RefObject<HTMLDivElement>}
      $isOpened={isOpened}
      data-testid="story-list-container"
    >
      {isOpened ? (
        <StoryList
          userStories={userStories}
          userInfo={userInfo}
          myStories={myStories}
        />
      ) : (
        <CollapsedStoryList userStories={userStories} onOpen={handleOpen} />
      )}
    </StyledContainer>
  );
}

export default StoryListContainer;
