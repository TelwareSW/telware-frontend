import styled from "styled-components";
import { story } from "types/story";
import Avatar from "@components/Avatar";

interface StoryIconProps {
  stories: story[];
  avatar?: string;
  name: string;
  onView?: (userId: string) => void;
  isCollapsed?: boolean;
  userId?: string;
}

const StyledContainer = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: ${(props) => (props.$isCollapsed ? "0" : "0.5rem")};
  min-width: ${(props) => (props.$isCollapsed ? "55px" : "90px")};
  border-radius: var(--border-radius-default);
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const StyledImageContainer = styled.div<{
  $segmentColors: string;
}>`
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: conic-gradient(${(props) => props.$segmentColors});
  padding: 2px;
  display: block;
`;

const StyledName = styled.p`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text);
  text-align: center;
  white-space: nowrap;
`;

function StoryIcon(props: StoryIconProps) {
  const { stories, avatar, name, userId, onView, isCollapsed = false } = props;

  // Calculate the segment degree based on the number of stories
  const segmentDegree = 360 / stories.length;
  const segmentColors = stories
    .map((story, index) =>
      story.viewed
        ? `gray ${index * segmentDegree}deg ${(index + 1) * segmentDegree}deg`
        : `var(--accent-color) ${index * segmentDegree}deg ${(index + 1) * segmentDegree}deg`
    )
    .join(", ");

  //Handle the name display
  const firstName =
    name?.split(" ")[0]?.slice(0, 3) +
      (name?.split(" ")[0]?.length > 3 ? "..." : "") || "";
  const lastName =
    name?.split(" ")[1]?.slice(0, 3) +
      (name?.split(" ")[1]?.length > 3 ? "..." : "") || "";
  const displayName = `${firstName} ${lastName}`.trim();

  const handleIconClicked = () => {
    if (userId && onView) {
      onView(userId);
    }
  };

  return (
    <StyledContainer $isCollapsed={isCollapsed} onClick={handleIconClicked}>
      <StyledImageContainer $segmentColors={segmentColors}>
        <Avatar name={name} avatar={avatar} />
      </StyledImageContainer>
      {!isCollapsed && <StyledName>{displayName}</StyledName>}
    </StyledContainer>
  );
}

export default StoryIcon;
