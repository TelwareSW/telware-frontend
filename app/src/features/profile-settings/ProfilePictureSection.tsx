import styled from "styled-components";
import { getIcon } from "@data/icons";
import ImageEditor from "@components/ImageEditor";
import { useState } from "react";

interface ProfilePictureSectionProps {
  initials?: string;
  handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadProfilePicture = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--color-background);
  position: relative;
  cursor: pointer;

  &:hover svg {
    scale: 1.2;
  }
`;

const UploadProfilePictureIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  cursor: pointer;
  z-index: 5;

  svg {
    transition: all 0.2s ease-out;
    transform-origin: center;
    font-size: 3rem;
  }
`;

const StyledImageInput = styled.input`
  position: absolute;
  top: 1rem;
  left: calc(50% - 4rem);
  width: 8rem;
  height: 8rem;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
`;
const StyledProfileImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
`;
const DefaultProfilePicture = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: var(--accent-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
  font-weight: bold;
  opacity: 0.8;
`;
function ProfilePictureSection({
  initials,
  handleImageUpload,
}: ProfilePictureSectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
  return (
    <UploadProfilePicture>
      <StyledImageInput
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        data-testid="image-upload"
        id="photo"
      />
      {selectedImage ? (
        <>
          <UploadProfilePictureIcon>
            {getIcon("AddPhoto")}
          </UploadProfilePictureIcon>
          <StyledProfileImage src={selectedImage} alt="Profile Picture" />
        </>
      ) : (
        <DefaultProfilePicture>{initials}</DefaultProfilePicture>
      )}
      <ImageEditor isOpen={isImageEditorOpen} />
    </UploadProfilePicture>
  );
}

export default ProfilePictureSection;
