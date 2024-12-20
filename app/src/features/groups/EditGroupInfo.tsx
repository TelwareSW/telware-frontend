import styled from "styled-components";
import SettingsRow from "./SettingsRow";
import { useDispatch } from "react-redux";
import { updateSideBarView, resetRightSideBar } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";
import { useGroupInfo } from "./hooks/useGroupInfo";
import { useSocket } from "@hooks/useSocket";
import { useRightSideBarContext } from "./contexts/RightSideBarProvider";

const Container = styled.div`
  background-color: var(--color-background);

  display: flex;
  flex-direction: column;
`;

function EditGroupInfo() {
  const dispatch = useDispatch();
  const { admins, groupMembers, chatId, isPending } = useGroupInfo();
  const { leaveGroup } = useSocket();
  const { setIsRightSideBarOpen } = useRightSideBarContext();

  if (isPending) return;

  function handleGroupTypeClick() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.GROUP_TYPE,
        data: { type: "right" },
      })
    );
  }

  function handleDisplayAdmins() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.ADMINS,
        data: { type: "right" },
      })
    );
  }

  function handleDisplayMembers() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.MEMBERS,
        data: { type: "right" },
      })
    );
  }

  function handleLeaveGroup() {
    leaveGroup({ chatId: chatId! });
    setIsRightSideBarOpen(false);
    dispatch(resetRightSideBar());
  }

  return (
    <Container data-testid="group-settings-container">
      <SettingsRow
        testid="group-type"
        icon="Lock"
        title="Group Type"
        subtitle="private"
        onClick={handleGroupTypeClick}
      />
      <SettingsRow
        testid="admins"
        icon="Admin"
        title="Adminstators"
        subtitle={admins.length}
        onClick={handleDisplayAdmins}
      />
      <SettingsRow
        testid="members"
        icon="Members"
        title="Members"
        subtitle={groupMembers.length}
        onClick={handleDisplayMembers}
      />
      <SettingsRow
        testid="leave-group-button"
        icon="Delete"
        title="Delete and Leave Group"
        subtitle=""
        onClick={handleLeaveGroup}
      />
    </Container>
  );
}

export default EditGroupInfo;
