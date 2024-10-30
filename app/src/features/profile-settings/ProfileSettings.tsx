import styled from "styled-components";

import { AddAPhotoOutlined, Check } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FloatingLabelInput from "@components/inputs/float-label-input/FloatingLabelInput";
import { DevTool } from "@hookform/devtools";

import { BIO_MAX_LENGTH, ValidationSchema } from "./schema/EditProfileSchema";
import { useProfileSettings } from "./hooks/useProfileSettings";
import { useUpdateProfileSettings } from "./hooks/useUpdateProfileSettings";
import { useEffect, useState } from "react";
import SettingsSideBarHeader from "@components/side-bar/settings/SettingsSideBarHeader";

const SideBarContainer = styled.div`
  overflow-y: auto;

  & > form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    min-height: 100dvh;
    background-color: var(--color-background-secondary);
  }
`;

const SettingSection = styled.section`
  padding: 1rem 1.5rem;
  background-color: var(--color-background);
`;

const Hint = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
`;

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

  svg {
    transition: all 0.2s ease-out;
    transform-origin: center;
    font-size: 3rem;
  }
`;

const StyledImageInput = styled.input`
  position: absolute;
  top: 1rem;
  left: 5rem;
  width: 9rem;
  height: 8rem;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
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
const SubmitButton = styled.button<{ $revealed?: boolean }>`
  --button-width: 3.5rem;

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
  transition: opacity 0.2s;
  transition: transform 0.2s ease-in-out;
  transform: translateY(300%);
  box-shadow: 0 0 0.1rem var(--accent-color);
  position: absolute;
  bottom: 2rem;
  right: 1rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $revealed }) =>
    $revealed &&
    `
    transform: translateY(0);
  `}
`;

interface EditProfileForm {
  profilePicture: string;
  firstName: string;
  lastName: string;
  bio: string;
  username: string;
  email: string;
  phone: string;
}

function ProfileSettings() {
  const { data: initialProfileSettings } = useProfileSettings();
  const { updateProfileSettings } = useUpdateProfileSettings();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditProfileForm>({
    resolver: yupResolver(ValidationSchema),
    mode: "onChange",
    defaultValues: initialProfileSettings || {
      profilePicture: "",
      firstName: "",
      lastName: "",
      bio: "",
      username: "",
    },
  });

  useEffect(() => {
    if (initialProfileSettings) {
      reset(initialProfileSettings);
    }
  }, [initialProfileSettings, reset]);

  const userHandle = `https://telware.online/${watch("username") || "username"}`;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const onSubmit = async (data: EditProfileForm) => {
    try {
      if (selectedImage) {
        data.profilePicture = selectedImage;
      }
      updateProfileSettings(data);
    } catch (error) {
      console.error(error);
    }
  };
  const firstName = watch("firstName") || "";
  const lastName = watch("lastName") || "";
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <SideBarContainer>
      <SettingsSideBarHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DevTool control={control} placement="top-right" />

        <SettingSection>
          <UploadProfilePicture>
            {/* Image Upload */}
            <StyledImageInput
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              data-testid="image-upload"
            />
            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt="Profile Picture"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </>
            ) : (
              <DefaultProfilePicture>{initials}</DefaultProfilePicture>
            )}
            {initials?.length == 0 && (
              <UploadProfilePictureIcon>
                <AddAPhotoOutlined />
              </UploadProfilePictureIcon>
            )}
          </UploadProfilePicture>

          <FloatingLabelInput<EditProfileForm>
            id="firstName"
            label="First Name (required)"
            register={register}
            watch={watch}
            error={errors.firstName?.message}
            data-testid="first-name"
          />
          <FloatingLabelInput<EditProfileForm>
            id="lastName"
            label="Last Name (optional)"
            register={register}
            watch={watch}
            error={errors.lastName?.message}
            data-testid="last-name"
          />
          <FloatingLabelInput<EditProfileForm>
            id="bio"
            label="Bio"
            register={register}
            watch={watch}
            error={errors.bio?.message}
            maxLength={BIO_MAX_LENGTH}
            data-testid="bio"
          />
          <Hint>
            Any details such as age, occupation or city.
            <br />
            Example: 23 y.o. designer from San Francisco
          </Hint>
        </SettingSection>
        <SettingSection>
          <SectionTitle>Username</SectionTitle>
          <FloatingLabelInput<EditProfileForm>
            id="username"
            label="Username"
            register={register}
            watch={watch}
            error={errors.username?.message}
            data-testid="username"
          />
          <Hint>
            You can choose a username on <b>Telware</b>. If you do, people will
            be able to find you by this username and contact you without needing
            your phone number.
          </Hint>
          <Hint>
            You can use a-z, 0-9 and underscores. Minimum length is 5
            characters.
          </Hint>
          <Hint>
            This link opens a chat with you:
            <br />
            {userHandle}
          </Hint>
        </SettingSection>
        <SettingSection>
          <SectionTitle>Contact Information</SectionTitle>
          <FloatingLabelInput<EditProfileForm>
            id="email"
            label="Email"
            register={register}
            watch={watch}
            error={errors.email?.message}
            data-testid="email"
          />
          <FloatingLabelInput<EditProfileForm>
            id="phone"
            label="Phone number"
            type="tel"
            register={register}
            watch={watch}
            error={errors.phone?.message}
            data-testid="phone"
          />
        </SettingSection>
        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          $revealed={isDirty}
          data-testid="submit-button"
        >
          <Check />
        </SubmitButton>
      </form>
    </SideBarContainer>
  );
}

export default ProfileSettings;
export type { EditProfileForm };
