import styled from "styled-components";
import SettingsRow from "./SettingsRow";
import { useDispatch } from "react-redux";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";

const Container = styled.div`
  background-color: var(--color-background);

  display: flex;
  flex-direction: column;
`;

function EditGroupInfo() {
  const dispatch = useDispatch();

  function handleGroupTypeClick() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.GROUP_TYPE,
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
        subtitle="1"
        onClick={() => {}}
      />
      <SettingsRow
        icon="Members"
        title="Members"
        subtitle="1"
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
