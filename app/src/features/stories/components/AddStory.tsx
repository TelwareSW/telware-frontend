import { useRef, useState } from "react";
import styled from "styled-components";
import CircleIcon from "@components/CircleIcon";
import ImageEditor from "@components/ImageEditor";
import Popup from "@components/Popup";
import StoryPreview from "./StoryPreview";
import toast from "react-hot-toast";

const StyledStoryCreator = styled.div`
  cursor: pointer;
`;
const StyledImageInput = styled.input`
  position: absolute;
  bottom: 0;
  right: 2rem;
  height: 3.3rem;
  width: 3.3rem;
  padding: 0.5rem;
  border-radius: 50%;
  opacity: 0;
  z-index: -1;
  cursor: pointer;
`;

function AddStory() {
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  const [isPreviewOpened, setIsPreviewOpened] = useState(false);
  const [story, setStory] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.includes("tif") || file?.type.includes("tiff")) {
      toast.error("TIF files are not supported");
      return;
    }
    if (file) {
      setStory(file);
      setIsImageEditorOpen(true);
    }
  };
  const handleClose = () => {
    setIsImageEditorOpen(false);
  };

  const handleFinishEditting = (story: File) => {
    setStory(story);
    setIsImageEditorOpen(false);
    setIsPreviewOpened(true);
  };

  const handleAddStoryClicked = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <StyledStoryCreator onClick={handleAddStoryClicked}>
        <CircleIcon
          data-testid="add-story-icon"
          $icon="AddStory"
          $right={0.25}
          $bottom={0}
          $size={3.3}
          $padding={0.5}
          $color="white"
          $bgColor="var(--accent-color)"
          $opacity={1}
        />
        <StyledImageInput
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          data-testid="story-upload-input"
          id="story-upload"
        />
      </StyledStoryCreator>

      {
        <Popup
          isOpen={isImageEditorOpen}
          onClose={() => setIsImageEditorOpen(false)}
        >
          <ImageEditor
            src={story ? URL.createObjectURL(story) : ""}
            isOpen={isImageEditorOpen}
            closeImgEditor={handleClose}
            onImageSave={handleFinishEditting}
            isProfileImage={false}
            widthRatio={80}
            heightRatio={80}
          />
        </Popup>
      }
      <StoryPreview
        isOpen={isPreviewOpened && !!story}
        onClose={() => setIsPreviewOpened(false)}
        story={story}
      />
    </>
  );
}

export default AddStory;
