import { useState } from "react";
import styled from "styled-components";
import { storyView } from "types/story";
import UserInfo from "./UserInfo";

interface StoryViewsProps {
  views: storyView[];
}
const StyledViews = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  overflow-x: auto;
  background-color: var(--bg-secondary);
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
`;
function StoryViews(props: StoryViewsProps) {
  const { views } = props;
  const [isOpened, setIsOpened] = useState(false);
  return isOpened ? (
    <StyledViews>
      {views.map((view: storyView) => (
        <div key={view.id}>
          <UserInfo
            name={view.username}
            avatar={view?.avatar || ""}
            elapsedTime={(
              new Date().getTime() - (Number(view.seenTime) || 0)
            ).toString()}
          />
        </div>
      ))}
    </StyledViews>
  ) : (
    <button onClick={() => setIsOpened(true)}>View views</button>
  );
}

export default StoryViews;
