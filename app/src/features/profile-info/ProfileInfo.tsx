import { useProfileSettings } from "@features/profile-settings/hooks/useProfileSettings";
import styled from "styled-components";
import ProfileItem from "./components/ProfileItem";

const ProfileInfoStyled = styled.div`
  border-bottom: 0.625rem solid var(--color-background-secondary);
  color: var(--color-text);
  padding: 0.5rem 0.3125rem;
  margin: 0.5rem 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function ProfileInfo() {
  const { data: profileSettings } = useProfileSettings();
  return (
    <ProfileInfoStyled>
      {profileSettings?.phone && (
        <ProfileItem
          data={profileSettings.phone}
          ribbon="Phone"
          icon="Phone"
          data-testid="phone-profile-item"
        />
      )}
      {profileSettings?.email && (
        <ProfileItem
          data={profileSettings.email}
          ribbon="Email"
          icon="Email"
          data-testid="email-profile-item"
        />
      )}
      {profileSettings?.username && (
        <ProfileItem
          data={profileSettings.username}
          ribbon="Username"
          icon="AlternateEmailTwoTone"
          data-testid="username-profile-item"
        />
      )}
      {profileSettings?.bio && (
        <ProfileItem
          data={profileSettings.bio}
          ribbon="Bio"
          icon="Info"
          data-testid="bio-profile-item"
        />
      )}
    </ProfileInfoStyled>
  );
}

export default ProfileInfo;
