import styled from "styled-components";

const ProfileItemStyled = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2rem;
`;
const ProfileItemInfo = styled.div``;
const ProfileItemIcon = styled.div`
  font-size: 1.5rem;
  color: var(--color-text-secondary);
`;
const ProfileItemData = styled.p`
  line-height: 1.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1rem;
`;
const ProfileItemRibbon = styled.span`
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: var(--color-text-secondary);
`;

interface ProfileItemProps {
  data: string;
  ribbon: string;
  Icon: React.ElementType;
}

function ProfileItem({ data, ribbon, Icon }: ProfileItemProps) {
  return (
    <ProfileItemStyled>
      <ProfileItemIcon>
        <Icon />
      </ProfileItemIcon>
      <ProfileItemInfo>
        <ProfileItemData>{data}</ProfileItemData>
        <ProfileItemRibbon>{ribbon}</ProfileItemRibbon>
      </ProfileItemInfo>
    </ProfileItemStyled>
  );
}

export default ProfileItem;
