import { useState } from "react";
import styled from "styled-components";
import { storyView } from "types/story";
import UserInfo from "./UserInfo";
import { useViews } from "../hooks/useViews";
import { getIcon } from "@data/icons";
import { getElapsedTime } from "utils/helpers";

interface StoryViewsProps {
  storyId: string;
}

const StyledViewsContainer = styled.div<{ $isOpened: boolean }>`
  position: absolute;
  bottom: 5%;
  left: auto;

  z-index: 1;

  width: 100%;
  min-height: ${({ $isOpened }) => ($isOpened ? "60vh" : "auto")};
  padding: ${({ $isOpened }) => ($isOpened ? "1rem" : "0.5rem 1rem")};
  background-color: ${({ $isOpened }) =>
    $isOpened ? "var(--story-views-background)" : "var(--accent-color-shade)"};

  box-shadow: ${({ $isOpened }) =>
    $isOpened ? "0 4px 10px rgba(0, 0, 0, 0.2)" : "none"};
  color: white;
`;
const StyledViews = styled.ul`

  z-index: 1;

  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  padding: 2.5rem 0.5rem 0.5rem 0.5rem;
  align-items: center;
  justify-content: flex-start;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;
const StyledView = styled.li`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
`;
const StyledCloseButton = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: flex-end;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
`;

const StyledViewButton = styled.button`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--story-views-background);
  align-items: center;
  justify-content: flex-start;
  border: none;
  cursor: pointer;
  width: 100%;
  position: absolute;
  bottom: -2rem;
  left: 0;
  height: 3rem;
  &:hover {
    background-color: var(--story-views-background-hover);
  }
  ${({ disabled }) =>
    disabled &&
    `
    background-color: var(--story-views-background-hover);
    pointer-events: none;
  `}
`;

function StoryViews(props: StoryViewsProps) {
  const { storyId } = props;
  const viewsData = useViews(storyId);
  const views = viewsData.views?.data || [];

  const [isOpened, setIsOpened] = useState(false);

  return (
    <StyledViewsContainer $isOpened={isOpened}>
      {isOpened && (
        <StyledViews>
          {views.map((view: storyView) => (
            <StyledView key={view.id}>
              <UserInfo
                name={view.username}
                avatar={view?.avatar || ""}
                elapsedTime={getElapsedTime(view.seenTime)}
                isVertical={true}
              />
            </StyledView>
          ))}
          <StyledCloseButton onClick={() => setIsOpened(false)}>
            {getIcon("Close")}
          </StyledCloseButton>
        </StyledViews>
      )}
      <StyledViewButton onClick={() => setIsOpened(true)} disabled={isOpened}>
        {views.length > 0 ? `${views.length} views` : "No views"}
      </StyledViewButton>
    </StyledViewsContainer>
  );
}

export default StoryViews;
