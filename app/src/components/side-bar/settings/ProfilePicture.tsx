import { STATIC_MEDIA_URL } from "@constants";
import { useProfileSettings } from "@features/profile-settings/hooks/useProfileSettings";
import styled from "styled-components";

const ProfilePictureContainer = styled.div`
  position: relative;
`;

const StyledImg = styled.img<{ $isCircleStyle?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
  aspect-ratio: 1/1;
  width: 100%;
  object-fit: fill;
  border-radius: ${({ $isCircleStyle }) => ($isCircleStyle ? "50%" : "0")};
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
      <StyledImg
        alt="profile"
        $isCircleStyle={isCircleStyle}
        data-testid="profile-picture"
        src={STATIC_MEDIA_URL + profileSettings?.photo}
      />
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
