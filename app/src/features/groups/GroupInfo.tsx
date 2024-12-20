import styled from "styled-components";
import { useGroupInfo } from "./hooks/useGroupInfo";
import UsersList from "@components/UsersList";
import Avatar from "@components/Avatar";
import { sideBarPages } from "types/sideBar";
import { useDispatch } from "react-redux";
import { updateSideBarView } from "@state/side-bar/sideBar";
import AddMembersButton from "./AddMembersButton";

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
  const dispatch = useDispatch();
  if (isPending) return;

  function handleAddMembers() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.ADD_MORE_MEMBERS,
        data: { type: "right", view: "existing group" },
      })
    );
  }

  return (
    <Container data-testid="group-info-container">
      <GroupDetails data-testid="groups-details-container">
        <Avatar name={group?.name} image={group?.photo} size="large" />
        <Info>
          <GroupName data-testid="group-name">{group?.name}</GroupName>
          <MembersCount data-testid="group-members-count">
            {groupMembers.length} members
          </MembersCount>
        </Info>
      </GroupDetails>
      <StyledUsersList data-testid="members-list">
        <UsersList view="display" users={groupMembers!} />
      </StyledUsersList>

      <AddMembersButton
        data-testid="add-members-button"
        onClick={handleAddMembers}
      />
    </Container>
  );
}

export default GroupInfo;
