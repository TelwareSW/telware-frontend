import { useState } from "react";
import styled, { css } from "styled-components";
import { useStroies } from "../hooks/useStories";
import { useMyStroies } from "../hooks/useMyStories";
import { useAppSelector } from "@hooks/useGlobalState";
import { useMouseLeave } from "@hooks/useMouseLeave";
import CollapsedList from "@components/CollapsedList";
import StoryList from "./StoryList";
import StoryIcon from "./StoryIcon";

const StyledContainer = styled.div<{ $isOpened: boolean }>`
  position: relative;
  width: 100%;
  ${(props) =>
    !props.$isOpened &&
    css`
      position: absolute;
      width: 3%;
      left: 97%;
      top: 0;
    `}
  height: 6rem;
  z-index: 100;
`;

function StoryListContainer() {
  const [isOpened, setIsOpened] = useState(false);
  const { stories: userStoriesData } = useStroies();

  const userStories = userStoriesData?.data;

  const { myStories: myStoriesData } = useMyStroies();
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
          data-testid="story-list"
        />
      ) : (
        <CollapsedList
          data-testid="stories-collapsed-list"
          onOpen={handleOpen}
          render={(userStory) => (
            <StoryIcon
              isCollapsed={true}
              name={userStory.name}
              avatar={userStory.avatar}
              stories={userStory.stories}
              data-testid={`story-icon-${userStory.id}`}
            />
          )}
          list={userStories}
        />
      )}
    </StyledContainer>
  );
}

export default StoryListContainer;
