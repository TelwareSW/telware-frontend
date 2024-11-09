import { userStories } from "types/story";
import StoryIcon from "./StoryIcon";
import styled from "styled-components";

interface CollapsedStoryListProps {
  userStories: userStories[];
  onOpen: () => void;
}

const StyledCollapsedContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const StyledCollapsed = styled.div<{ $index: number }>`
  position: absolute;
  z-index: 30 - index;
  right: ${(props) => props.$index * 4 + 20}px;
  top: 0.7rem;
  transform: scale(0.8);
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

function CollapsedStoryList(Props: CollapsedStoryListProps) {
  const { userStories, onOpen } = Props;
  const displayedStories = userStories?.slice(0, 3);
  return (
    <StyledCollapsedContainer onClick={onOpen}>
      {displayedStories?.map((userStory, index) => (
        <StyledCollapsed key={userStory.id} $index={index}>
          <StoryIcon
            isCollapsed={true}
            name={userStory.name}
            avatar={userStory.avatar}
            stories={userStory.stories}
          />
        </StyledCollapsed>
      ))}
    </StyledCollapsedContainer>
  );
}

export default CollapsedStoryList;
