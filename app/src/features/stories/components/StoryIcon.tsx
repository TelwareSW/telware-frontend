import styled from "styled-components";
import { story } from "types/story";
import Avatar from "@components/Avatar";

interface StoryIconProps {
  stories: story[];
  photo?: string;
  name: string;
  onView?: (userId: string) => void;
  isCollapsed?: boolean;
  userId?: string;
  isMyStory?: boolean;
}

const StyledContainer = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  padding: ${(props) => (props.$isCollapsed ? "0" : "0.5rem")};
  min-width: ${(props) => (props.$isCollapsed ? "55px" : "90px")};
  border-radius: ${(props) =>
    props.$isCollapsed
      ? "var(--border-radius-circle)"
      : "var(--border-radius-default)"};
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const StyledImageContainer = styled.div<{
  $segmentColors: string;
  $isMyStory?: boolean;
}>`
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) =>
    props?.$isMyStory
      ? "var(--accent-color)"
      : `conic-gradient(${props.$segmentColors})`};
  padding: 3px;
  display: block;
`;

const StyledName = styled.p`
  margin-top: 0.3rem;
  font-size: 0.7rem;
  color: var(--secondary-text-color);
  text-align: center;
  white-space: nowrap;
`;

function StoryIcon(props: StoryIconProps) {
  const {
    stories,
    photo,
    name,
    userId,
    onView,
    isMyStory,
    isCollapsed = false,
  } = props;

  let segmentColors = "";
  if (!isMyStory) {
    const segmentDegree = 360 / stories.length;
    segmentColors = stories
      .map((story, index) =>
        story.viewed
          ? `gray ${index * segmentDegree}deg ${(index + 1) * segmentDegree}deg`
          : `var(--accent-color) ${index * segmentDegree}deg ${(index + 1) * segmentDegree}deg`
      )
      .join(", ");
  }

  const firstName =
    name?.split(" ")[0]?.slice(0, 4) +
      (name?.split(" ")[0]?.length > 4 ? "..." : "") || "";
  const lastName =
    name?.split(" ")[1]?.slice(0, 4) +
      (name?.split(" ")[1]?.length > 4 ? "..." : "") || "";
  const displayName = `${firstName} ${lastName}`.trim();

  const handleIconClicked = () => {
    if (userId && onView) {
      onView(userId);
    }
  };

  return (
    <StyledContainer $isCollapsed={isCollapsed} onClick={handleIconClicked}>
      <StyledImageContainer
        $segmentColors={segmentColors}
        $isMyStory={isMyStory}
      >
        <Avatar name={name} image={photo} />
      </StyledImageContainer>
      {!isCollapsed && <StyledName>{displayName}</StyledName>}
    </StyledContainer>
  );
}

export default StoryIcon;
