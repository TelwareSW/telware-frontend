import { getIcon } from "@data/icons";
import styled from "styled-components";

const UploadProfilePictureContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  cursor: pointer;
  z-index: 5;
  &:hover svg {
    transform: scale(1.2);
  }
  svg {
    transition: all 0.2s ease-out;
    transform-origin: center;
    font-size: 3rem;
  }
`;

const StyledImageInput = styled.input`
  position: absolute;
  top: calc(50% - 4rem);
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

const ProfilePictureSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--color-background);
  position: relative;
`;

interface UploadImgProps {
  setSelectedImageFile: (file: File | null) => void;
  selectedImageFile?: File | null;
}

export default function UploadImage({
  setSelectedImageFile,
  selectedImageFile,
}: UploadImgProps) {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedImageFile(file);
    }
  };

  return (
    <ProfilePictureSection>
      <UploadProfilePictureContainer>
        <StyledImageInput
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          data-testid="image-upload"
          id="photo"
        />
        {getIcon("AddPhoto")}
      </UploadProfilePictureContainer>

      {selectedImageFile ? (
        <StyledProfileImage
          src={URL.createObjectURL(selectedImageFile)}
          alt="Profile Picture"
        />
      ) : (
        <DefaultProfilePicture />
      )}
    </ProfilePictureSection>
  );
}
