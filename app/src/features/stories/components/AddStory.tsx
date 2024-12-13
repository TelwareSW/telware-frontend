import { useRef, useState } from "react";
import styled from "styled-components";
import CircleIcon from "@components/CircleIcon";
import ImageEditor from "@components/ImageEditor";
import Popup from "@components/Popup";
import StoryPreview from "./StoryPreview";
import toast from "react-hot-toast";
import { MAX_STORY_SIZE } from "@constants";

const StoryCreator = styled.div`
  cursor: pointer;
`;
const ImageInput = styled.input`
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
    if (file) {
      const fileType = file.type;
      if (fileType.includes("tif") || fileType.includes("tiff")) {
        toast.error("TIF files are not supported");
        return;
      }

      if (!fileType.includes("image") && !fileType.includes("video")) {
        toast.error("Unsupported file type. Please upload an image or video.");
        return;
      }
      if (file.size > MAX_STORY_SIZE) {
        toast.error("File size too large. Please upload a file less than 5MB.");
        return;
      }
      setStory(file);
      if (fileType.includes("image")) {
        setIsImageEditorOpen(true);
      } else {
        setIsPreviewOpened(true);
      }
    }
  };
  const handleClose = () => {
    fileInputRef.current!.value = "";
    setIsImageEditorOpen(false);
  };

  const handleFinishEditting = (story: File) => {
    setStory(story);
    setIsImageEditorOpen(false);
    setIsPreviewOpened(true);
  };
  const handleImageEditorClose = () => {
    setStory(null);
    fileInputRef.current!.value = "";
    setIsImageEditorOpen(false);
  };

  const handleAddStoryClicked = () => {
    fileInputRef.current?.click();
  };

  const handleStoryPreviewClose = () => {
    fileInputRef.current!.value = "";
    setStory(null);
    setIsPreviewOpened(false);
  };

  return (
    <>
      <StoryCreator onClick={handleAddStoryClicked}>
        <CircleIcon
          data-testid="add-story-icon"
          $icon="AddStory"
          $right={0.25}
          $bottom={0}
          $size={3.3}
          $padding={0.5}
          $color="white"
          $bgColor="var(--accent-color)"
          $opacity={0.95}
        />
        <ImageInput
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          onChange={handleImageUpload}
          data-testid="story-upload-input"
          id="story-upload"
        />
      </StoryCreator>

      {
        <Popup isOpen={isImageEditorOpen} onClose={handleImageEditorClose}>
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
        onClose={handleStoryPreviewClose}
        story={story}
      />
    </>
  );
}

export default AddStory;
