import styled from "styled-components";
import StorySlide from "./StorySlide";
import { getIcon } from "@data/icons";
import StoryViews from "./StoryViews";
import { useDeleteStory } from "../hooks/useDeleteStory";
import { useViews } from "../hooks/useViews";

interface MyStoryProps {
  storyID: string;
}

const StyledDeleteIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem;
  cursor: pointer;
`;
function MyStorySlide(Props: MyStoryProps) {
  const { storyID } = Props;
  const { deleteStory } = useDeleteStory();
  const onView = () => {};
  const { views } = useViews();
  const handleDeleteIcon = () => {
    deleteStory(storyID);
  };
  return (
    <>
      <StorySlide
        storyId="storyId"
        content="content"
        caption="caption"
        avatar="avatar"
        name="name"
        timestamp={0}
        onView={() => {}}
        index={0}
        stories={[]}
      />
      <StyledDeleteIcon onClick={handleDeleteIcon}>
        {getIcon("Delete")}
      </StyledDeleteIcon>
      <StoryViews views={[]} />
    </>
  );
}

export default MyStorySlide;
