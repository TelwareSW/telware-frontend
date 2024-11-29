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
      width: 80vw;
      height: 80vh;
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

function StoryPreview(props: StoryPreviewProps) {
  const { story, onClose, isOpen } = props;
  const [caption, setCaption] = useState("");
  const { postStory } = usePostStory();
  const sendStory = () => {
    if (story) postStory({ story, caption });
    handleClose();
  };

  const handleClose = () => {
    setCaption("");
    onClose();
  };
  if (!story) return null;
  return (
    <Popup isOpen={isOpen} onClose={handleClose}>
      <StyledContainer>
        <StyledImageContainer>
          <ModalImage
            small={URL.createObjectURL(story!)}
            medium={URL.createObjectURL(story!)}
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
    </Popup>
  );
}

export default StoryPreview;
