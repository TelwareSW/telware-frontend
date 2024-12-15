import styled from "styled-components";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FloatingLabelInput from "@components/inputs/float-label-input/FloatingLabelInput";
import { DevTool } from "@hookform/devtools";

import { BIO_MAX_LENGTH, ValidationSchema } from "./schema/EditProfileSchema";
import { useProfileSettings } from "./hooks/useProfileSettings";
import { useUpdateProfileSettings } from "./hooks/useUpdateProfileSettings";
import { useEffect, useState } from "react";
import SettingsSideBarHeader from "@components/side-bar/settings/SettingsSideBarHeader";
import toast from "react-hot-toast";
import { STATIC_MEDIA_URL } from "@constants";
import { getIcon } from "@data/icons";
import Modal from "@components/Modal";
import Button from "@components/Button";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";
import { useAppDispatch } from "@hooks/useGlobalState";
import { useUpdateProfilePicture } from "./hooks/useUpdateProfilePicture";
import { useDeleteProfilePicture } from "./hooks/useDeleteProfilePicture";
import { useSidebarType } from "@components/side-bar/SideBarContext";

const SideBarContainer = styled.div`
  overflow-y: auto;
  & > form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 90vh;
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

const ProfilePictureSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: var(--color-background);
  position: relative;
`;

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
const DeleteProfilePictureContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: calc(50% - 4rem);
  z-index: 20;
  background-color: red;
  border: 0.1rem solid var(--color-border);
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover svg {
    transform: scale(1.2);
  }
  svg {
    transition: all 0.2s ease-out;
    transform-origin: center;
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

export interface EditProfileForm {
  photo: string;
  firstName: string;
  lastName: string;
  bio: string;
  username: string;
  email: string;
  phone: string;
}

function ProfileSettings() {
  const { data: initialProfileSettings } = useProfileSettings();
  const { updateProfileSettings, isPending } = useUpdateProfileSettings();
  const { deleteProfilePicture } = useDeleteProfilePicture();
  const { updateProfilePicture } = useUpdateProfilePicture();
  const sideBarType = useSidebarType();

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [hasImage, setHasImage] = useState(
    Boolean(initialProfileSettings?.photo)
  );
  const [photoChanged, setPhotoChanged] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<EditProfileForm>({
    // @ts-expect-error - yupResolver type mismatch
    resolver: yupResolver(ValidationSchema),
    mode: "onChange",
    defaultValues: initialProfileSettings || {
      photo: "",
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

  const userHandle = `https://telware.tech/${watch("username") || "username"}`;

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setPhotoChanged(true);
      const file = event.target.files[0];
      setSelectedImageFile(file);
      setHasImage(true);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImageFile(null);
    setIsDeleting(false);
    setHasImage(false);
    setPhotoChanged(true);
  };
  const onSubmit = async (data: EditProfileForm) => {
    try {
      if (photoChanged) {
        if (selectedImageFile) {
          updateProfilePicture(selectedImageFile);
        } else {
          deleteProfilePicture();
        }
      }

      updateProfileSettings(data);
      toast.success("Profile settings updated successfully!");

      if (!isPending) {
        dispatch(
          updateSideBarView({
            redirect: sideBarPages.SETTINGS,
            data: { type: sideBarType },
          })
        );
      }
    } catch (error) {
      toast.error(
        (error as Error).message || "Failed to update profile settings"
      );
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
          <ProfilePictureSection>
            {hasImage && (
              <>
                <DeleteProfilePictureContainer
                  onClick={() => setIsDeleting(true)}
                >
                  {getIcon("Delete")}
                </DeleteProfilePictureContainer>

                <Modal
                  isOpen={isDeleting}
                  title="Delete photo"
                  message="Are you sure you want to delete this photo?"
                  onClose={() => setIsDeleting(false)}
                >
                  <Button
                    type="button"
                    onClick={handleDeleteImage}
                    $type="danger"
                    style={{ margin: "0 auto" }}
                  >
                    Delete
                  </Button>
                </Modal>
              </>
            )}
            <>
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
              ) : !photoChanged && initialProfileSettings?.photo ? (
                <StyledProfileImage
                  src={STATIC_MEDIA_URL + initialProfileSettings?.photo}
                  alt="Profile Picture"
                />
              ) : (
                <DefaultProfilePicture>{initials}</DefaultProfilePicture>
              )}
            </>
          </ProfilePictureSection>
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
          $revealed={isDirty || photoChanged}
          data-testid="submit-button"
        >
          {getIcon("Check")}
        </SubmitButton>
      </form>
    </SideBarContainer>
  );
}

export default ProfileSettings;
export { SubmitButton };
