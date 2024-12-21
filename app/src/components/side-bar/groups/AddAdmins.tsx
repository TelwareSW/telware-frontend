import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import AddMembers from "./AddMembers";
import AddMembersButton from "./AddMembersButton";

import { updateSideBarView } from "@state/side-bar/sideBar";

import { sideBarPages } from "types/sideBar";

import { useGroupInfo } from "@features/groups/hooks/useGroupInfo";
import { useAppSelector } from "@hooks/useGlobalState";
import { useSocket } from "@hooks/useSocket";
import { clearSelectedUsers } from "@state/groups/selectedUsers";

const Container = styled.div`
  width: 100%;
  background-color: var(--color-background);
`;

function AddAdmins() {
  const { chatId } = useParams<{ chatId: string }>();

  const { groupMembers, isPending } = useGroupInfo();

  const selectedUsers = useAppSelector((state) => state.selectedUsers);
  const { props } = useAppSelector((state) => state.sideBarData.rightSideBar);

  const dispatch = useDispatch();
  const { addAdmins } = useSocket();

  function handleClick() {
    addAdmins({
      chatId: chatId!,
      members: selectedUsers.map((user) => user._id),
    });
    const redirect = sideBarPages.ADMINS;
    dispatch(
      updateSideBarView({
        redirect,
        data: { type: "right", backView: props?.prevBackView! },
      })
    );
    dispatch(clearSelectedUsers());
  }

  if (isPending) return;

  const normalMembers = groupMembers?.filter((user) => user.role === "member");

  return (
    <Container>
      <AddMembers users={normalMembers!} />
      {!!selectedUsers.length && <AddMembersButton onClick={handleClick} />}
    </Container>
  );
}

export default AddAdmins;
