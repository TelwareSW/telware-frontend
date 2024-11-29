import { useState } from "react";
import styled, { css } from "styled-components";
import { useStroies } from "../hooks/useStories";
import { useMyStroies } from "../hooks/useMyStories";
import { useAppSelector } from "@hooks/useGlobalState";
import CollapsedList from "@components/CollapsedList";
import StoryList from "./StoryList";
import StoryIcon from "./StoryIcon";

const StyledContainer = styled.div<{ $isOpened: boolean }>`
  width: 100%;
  ${(props) =>
    !props.$isOpened
      ? css`
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: end;
          align-items: end;
          flex-direction: row;
        `
      : css`
          position: relative;
          height: 10rem;
          margin-bottom: -1rem;
        `}
  z-index: 1;
`;

function StoryListContainer() {
  const [isOpened, setIsOpened] = useState(false);
  const { stories: userStoriesData } = useStroies();

  const userStories = userStoriesData?.data;

  const { myStories: myStoriesData } = useMyStroies();
  const myStories = myStoriesData?.data;
  const { userInfo } = useAppSelector((state) => state.user);

  const handleOpen = () => {
    setIsOpened(true);
  };
  return (
    <StyledContainer $isOpened={isOpened} data-testid="story-list-container">
      {isOpened ? (
        <StoryList
          userStories={userStories}
          userInfo={userInfo}
          myStories={myStories}
          data-testid="story-list"
          onClose={() => setIsOpened(false)}
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
