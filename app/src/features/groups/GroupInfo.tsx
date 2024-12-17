import styled from "styled-components";
import { useGroupInfo } from "./hooks/useGroupInfo";
import UsersList from "@components/UsersList";
import Avatar from "@components/Avatar";
import CircleIcon from "@components/CircleIcon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GroupDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1.5rem;
  padding: 1rem;

  width: 100%;
`;

const GroupName = styled.div`
  color: var(--color-text);
`;

const MembersCount = styled.div`
  color: var(--color-text-secondary);
  font-size: 0.8rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledUsersList = styled.div`
  width: 100%;
  max-height: calc(100vh - 19rem);
  overflow-y: scroll;
  position: relative;

  background-color: var(--color-background);
`;

function GroupInfo() {
  const { group, groupMembers, isPending } = useGroupInfo();
  if (isPending) return;

  return (
    <Container>
      <GroupDetails>
        <Avatar name={group?.name} image={group?.photo} size="large" />
        <Info>
          <GroupName>{group?.name}</GroupName>
          <MembersCount>{groupMembers.length} members</MembersCount>
        </Info>
      </GroupDetails>
      <StyledUsersList>
        <UsersList view="display" users={groupMembers!} />
      </StyledUsersList>

      <CircleIcon
        type="submit"
        as="button"
        data-testid="add-members-button"
        $icon="AddMembers"
        $right={1}
        $bottom={2}
        $size={3.3}
        $padding={0.8}
        $color="white"
        $bgColor="var(--accent-color)"
        onClick={() => {}}
      />
    </Container>
  );
}

export default GroupInfo;
