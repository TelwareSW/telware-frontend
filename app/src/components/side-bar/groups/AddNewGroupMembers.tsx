import styled from "styled-components";

import AddMembers from "./AddMembers";

import { sideBarPages } from "types/sideBar";
import { updateSideBarView } from "@state/side-bar/sideBar";

import { useSidebarType } from "../SideBarContext";

import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import AddMembersButton from "./AddMembersButton";

const Container = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

function AddNewGroupMembers() {
  const sideBarType = useSidebarType();
  const { props } = useAppSelector((state) =>
    sideBarType === "left"
      ? state.sideBarData.leftSideBar
      : state.sideBarData.rightSideBar
  );

  const type = props?.view;
  const users = useAppSelector((state) => state.chats.members);

  const dispatch = useAppDispatch();

  function handleClick() {
    const redirect =
      type === "channel" ? sideBarPages.NEW_CHANNEL : sideBarPages.NEW_GROUP;
    dispatch(updateSideBarView({ redirect, data: { type: sideBarType } }));
  }

  return (
    <Container>
      <AddMembers users={users} />
      <AddMembersButton onClick={handleClick} />
    </Container>
  );
}

export default AddNewGroupMembers;
