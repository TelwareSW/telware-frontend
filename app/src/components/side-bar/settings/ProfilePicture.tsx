import { STATIC_MEDIA_URL } from "@constants";
import { useProfileSettings } from "@features/profile-settings/hooks/useProfileSettings";
import { getAvatarName } from "@utils/helpers";
import styled from "styled-components";

const ProfilePictureContainer = styled.div`
  position: relative;
`;

const Image = styled.div<{ $isCircleStyle?: boolean; $image?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
  aspect-ratio: 1/1;
  width: 100%;
  background: ${({ $image }) =>
    $image
      ? `url(${STATIC_MEDIA_URL + $image}) center/cover no-repeat`
      : "var(--color-avatar)"};

  border-radius: ${({ $isCircleStyle }) => ($isCircleStyle ? "50%" : "0")};

  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  font-weight: bold;
  font-size: 8rem;
  text-transform: uppercase;
`;

const ProfileInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;
  padding: 0 1.5rem 0.5rem;
  margin-bottom: 0, 75rem;
`;

const ProfileNameH2 = styled.h2`
  font-size: 1.25rem;
  line-height: 1.375rem;
  margin: 0;
`;
const LastSeenP = styled.p`
  line-height: 1rem;
  font-size: 0.857rem;
  opacity: 0.5;
`;

function ProfilePicture({ isCircleStyle }: { isCircleStyle?: boolean }) {
  const { data: profileSettings } = useProfileSettings();
  return (
    <ProfilePictureContainer>
      <Image
        $isCircleStyle={isCircleStyle}
        $image={profileSettings?.photo}
        data-testid="profile-picture"
      >
        {!profileSettings?.photo &&
          getAvatarName(
            (profileSettings?.firstName + profileSettings?.lastName).toString()
          )}
      </Image>
      {!isCircleStyle && (
        <ProfileInfo>
          <ProfileNameH2>
            {profileSettings?.firstName} {profileSettings?.lastName}
          </ProfileNameH2>
          <LastSeenP>
            {profileSettings?.lastSeen || "Last seen recently"}
          </LastSeenP>
        </ProfileInfo>
      )}
    </ProfilePictureContainer>
  );
}

export default ProfilePicture;
