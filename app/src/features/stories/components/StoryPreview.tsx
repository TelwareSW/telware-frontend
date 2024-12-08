import Popup from "@components/Popup";
import { getIcon } from "@data/icons";
import ModalImage from "react-modal-image";
import styled from "styled-components";
import { usePostStory } from "../hooks/usePostStory";
import { useState } from "react";

interface StoryPreviewProps {
  story: File | null;
  onClose: () => void;
  isOpen: boolean;
}

// Styled Components
const StyledContainer = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 1;

  width: 100%;
  height: 100%;
  gap: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000;
`;

const MediaContainer = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background);
  border-radius: var(--border-radius-default);

  img,
  video {
    width: 80vw;
    height: 80vh;
    object-fit: cover;
    border-radius: var(--border-radius-default);
  }
`;

const Caption = styled.input`
  width: 80%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-background);
  color: white;
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

function StoryPreview({ story, onClose, isOpen }: StoryPreviewProps) {
  const [caption, setCaption] = useState("");
  const { postStory } = usePostStory();

  const handleClose = () => {
    setCaption("");
    onClose();
  };

  const sendStory = () => {
    if (story) postStory({ story, caption });
    handleClose();
  };

  if (!story) return null;

  const isImage = story.type.startsWith("image");

  return (
    <Popup isOpen={isOpen} onClose={handleClose}>
      <StyledContainer>
        <MediaContainer>
          {isImage ? (
            <ModalImage
              small={URL.createObjectURL(story)}
              medium={URL.createObjectURL(story)}
              alt="Story"
            />
          ) : (
            <video controls>
              <source src={URL.createObjectURL(story)} type={story.type} />
              Your browser does not support the video tag.
            </video>
          )}
        </MediaContainer>
        <SendContainer>
          <Caption
            type="text"
            id="caption"
            data-testid="caption"
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption"
            value={caption}
            maxLength={100}
          />
          <SubmitButton
            onClick={(e) => {
              e.preventDefault();
              sendStory();
            }}
            data-testid="send-story"
          >
            {getIcon("Send")}
          </SubmitButton>
        </SendContainer>
      </StyledContainer>
    </Popup>
  );
}

export default StoryPreview;
