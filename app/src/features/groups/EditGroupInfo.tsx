import styled from "styled-components";
import SettingsRow from "./SettingsRow";
import { useDispatch } from "react-redux";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";
import { useGroupInfo } from "./hooks/useGroupInfo";

const Container = styled.div`
  background-color: var(--color-background);

  display: flex;
  flex-direction: column;
`;

function EditGroupInfo() {
  const dispatch = useDispatch();
  const { admins, groupMembers, isPending } = useGroupInfo();

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

  return (
    <Container>
      <SettingsRow
        icon="Lock"
        title="Group Type"
        subtitle="private"
        onClick={handleGroupTypeClick}
      />
      <SettingsRow
        icon="Admin"
        title="Adminstators"
        subtitle={admins.length}
        onClick={handleDisplayAdmins}
      />
      <SettingsRow
        icon="Members"
        title="Members"
        subtitle={groupMembers.length}
        onClick={() => {}}
      />
      <SettingsRow
        icon="Delete"
        title="Delete and Leave Group"
        subtitle=""
        onClick={() => {}}
      />
    </Container>
  );
}

export default EditGroupInfo;
