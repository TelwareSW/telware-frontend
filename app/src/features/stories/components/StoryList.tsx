import styled from "styled-components";
import StoryIcon from "./StoryIcon";
import { story, userStories } from "types/story";
import StorySlide from "./StorySlide";
import { useEffect, useState } from "react";

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
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  &::-webkit-scrollbar {
    display: block;
    height: 0.4rem;
  }
`;
function StoryList(props: StoryListProps) {
  const { userStories, myStories, userInfo } = props;
  const [currentStoryUserId, setCurrentStoryUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [stories, setStories] = useState<story[]>([]);
  const handleStoryClick = (userId: string) => {
    setCurrentStoryUserId(userId);
    setUserName("");
    setUserAvatar("");
    setStories([]);
  };
  useEffect(() => {
    if (currentStoryUserId) {
      setUserName(
        currentStoryUserId == "me"
          ? "My Story"
          : userStories.find((user) => user.id === currentStoryUserId)?.name ||
              ""
      );
      setUserAvatar(
        currentStoryUserId == "me"
          ? userInfo.photo || ""
          : userStories.find((user) => user.id === currentStoryUserId)
              ?.avatar || ""
      );
      setStories(
        currentStoryUserId == "me"
          ? myStories
          : userStories.find((user) => user.id === currentStoryUserId)
              ?.stories || []
      );
    }
  }, [
    currentStoryUserId,
    userStories,
    userInfo.screenName,
    userInfo.photo,
    myStories,
  ]);
  return (
    <>
      {currentStoryUserId && (
        <StorySlide
          userId={currentStoryUserId}
          name={userName}
          avatar={userAvatar}
          getNextUserStories={() => handleStoryClick("")}
          stories={stories}
          onClose={() => handleStoryClick("")}
        />
      )}
      <StyledStoryList data-testid="storylist">
        {myStories.length > 0 && (
          <StoryIcon
            data-testid="my-story-icon"
            name="My Story"
            avatar={userInfo.photo}
            stories={myStories}
            isMyStory={true}
            onView={handleStoryClick}
            userId="me"
          />
        )}
        {userStories.map((userStory: userStories) => (
          <StoryIcon
            key={userStory.id}
            data-testid={`story-icon-${userStory.id}`}
            name={userStory.name}
            avatar={userStory.avatar}
            stories={userStory.stories}
            userId={userStory.id}
            onView={handleStoryClick}
          />
        ))}
      </StyledStoryList>
    </>
  );
}

export default StoryList;
