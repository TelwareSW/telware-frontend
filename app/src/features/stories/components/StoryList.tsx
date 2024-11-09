import styled from "styled-components";
import StoryIcon from "./StoryIcon";
import { story, userStories } from "types/story";

interface StoryListProps {
  userStories: userStories[];
  myStories: story[];
  userInfo: {
    screenName: string;
    photo?: string;
  };
}
const StyledStoryList = styled.ul`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  overflow-x: auto;
  background-color: var(--bg-secondary);
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
`;
function StoryList(props: StoryListProps) {
  const { userStories, myStories, userInfo } = props;
  return (
    <StyledStoryList data-testid="storylist">
      <StoryIcon
        data-testid="my-story-icon"
        name="my story"
        avatar={userInfo.photo}
        stories={myStories}
        onView={() => {}}
      />
      {userStories.map((userStory: userStories) => (
        <StoryIcon
          key={userStory.id}
          data-testid={`story-icon-${userStory.id}`}
          name={userStory.name}
          avatar={userStory.avatar}
          stories={userStory.stories}
          userId={userStory.id}
          onView={() => {}}
        />
      ))}
    </StyledStoryList>
  );
}

export default StoryList;
