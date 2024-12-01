import styled from "styled-components";
import StoryIcon from "./StoryIcon";
import { story, userStories } from "types/story";
import StorySlide from "./StorySlide";
import { useEffect, useState } from "react";
import CloseButton from "@components/CloseButton";

interface StoryListProps {
  userStories: userStories[];
  myStories: story[];
  onClose: () => void;
  userInfo: {
    screenName: string;
    photo?: string;
  };
}

const StyledStoryListContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;

  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;
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
  const { userStories, myStories, userInfo, onClose } = props;
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
          : userStories.find((user) => user.userId === currentStoryUserId)
              ?.name || ""
      );
      setUserAvatar(
        currentStoryUserId == "me"
          ? userInfo.photo || ""
          : userStories.find((user) => user.userId === currentStoryUserId)
              ?.photo || ""
      );
      setStories(
        currentStoryUserId == "me"
          ? myStories
          : userStories.find((user) => user.userId === currentStoryUserId)
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
          photo={userAvatar}
          getNextUserStories={() => handleStoryClick("")}
          stories={stories}
          onClose={() => handleStoryClick("")}
        />
      )}
      <StyledStoryListContainer>
        <CloseButton onClose={onClose} data-testid="close-story-list" />
        <StyledStoryList data-testid="storylist">
          {myStories.length > 0 && (
            <StoryIcon
              data-testid="my-story-icon"
              name="My Story"
              photo={userInfo.photo}
              stories={myStories}
              isMyStory={true}
              onView={handleStoryClick}
              userId="me"
            />
          )}
          {userStories.map((userStory: userStories) => (
            <StoryIcon
              key={userStory.userId}
              data-testid={`story-icon-${userStory.userId}`}
              name={userStory.name}
              photo={userStory.photo}
              stories={userStory.stories}
              userId={userStory.userId}
              onView={handleStoryClick}
            />
          ))}
        </StyledStoryList>
      </StyledStoryListContainer>
    </>
  );
}

export default StoryList;
