import { useRef, useState } from "react";
import styled from "styled-components";
import CircleIcon from "@components/CircleIcon";
import ImageEditor from "@components/ImageEditor";
import ModalImage from "react-modal-image";
import { usePostStory } from "../hooks/usePostStory";
import { getIcon } from "@data/icons";

const StyledStoryCreator = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  height: 3.5rem;
  width: 3.5rem;
`;
const StyledImageInput = styled.input`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 3.3rem;
  width: 3.3rem;
  padding: 0.5rem;
  border-radius: 50%;
  opacity: 0;
  z-index: -1;
  cursor: pointer;
`;
const StyledContainer = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  gap: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
`;
const StyledImageContainer = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-background);
    border-radius: var(--border-radius-default);
    img {
      width: 80%;
      height: 80%;
      object-fit: cover !important;
    }
  }
`;
const StyledCaption = styled.input`
  width: 80%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-background);
  color: var(--text-color);
  font-size: 1rem;
`;
const SendContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const SubmitButton = styled.button`
  --button-width: 3.2rem;
  background-color: var(--accent-color);
  color: white;
  width: var(--button-width);
  height: var(--button-width);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 0 0.1rem var(--accent-color);
`;

function CreateStory() {
  const { postStory } = usePostStory();
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  const [story, setStory] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isCaptionAdded, setIsCaptionNeeded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStory(file);
      setIsImageEditorOpen(true);
    }
  };
  const handleClose = () => {
    setIsImageEditorOpen(false);
  };

  const handleAddCaption = (story: File) => {
    setStory(story);
    setIsImageEditorOpen(false);
    setIsCaptionNeeded(true);
  };

  const sendStory = () => {
    if (story) postStory({ story, caption });
    setCaption("");
    setIsCaptionNeeded(false);
    setStory(null);
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
          $right={0}
          $bottom={0}
          $size={3.3}
          $padding={0.5}
          $color="white"
          $bgColor="var(--accent-color)"
        />
        <StyledImageInput
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          data-testid="story-upload"
          id="story-upload"
        />
      </StyledStoryCreator>
      {isImageEditorOpen && (
        <ImageEditor
          src={story ? URL.createObjectURL(story) : ""}
          isOpen={isImageEditorOpen}
          closeImgEditor={handleClose}
          onImageSave={handleAddCaption}
          isProfileImage={false}
          widthRatio={80}
          heightRatio={80}
        />
      )}
      {isCaptionAdded && story && (
        <StyledContainer>
          <StyledImageContainer>
            <ModalImage
              small={URL.createObjectURL(story)}
              medium={URL.createObjectURL(story)}
              alt="story"
            />
          </StyledImageContainer>
          <SendContainer>
            <StyledCaption
              type="text"
              id="caption"
              data-testid="caption"
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption"
              value={caption}
              maxLength={100}
            />
            <SubmitButton
              onClick={sendStory}
              data-testid="send-story"
              type="submit"
            >
              {getIcon("Send")}
            </SubmitButton>
          </SendContainer>
        </StyledContainer>
      )}
    </>
  );
}

export default CreateStory;
