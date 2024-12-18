import styled from "styled-components";

import User from "@components/User";
import { useAppSelector } from "@hooks/useGlobalState";
import CreateGroupForm from "./CreateGroupForm";

export interface NewGroupForm {
  photo: string;
  groupName: string;
}

const Container = styled.div`
  background-color: var(--color-background-secondary);

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledUsersList = styled.div`
  width: 100%;

  position: relative;
  padding: 1rem 0;

  background-color: var(--color-background);
`;

const Count = styled.span`
  padding-left: 1rem;
  color: var(--accent-color);

  position: relative;
`;

export default function NewGroup() {
  const { props } = useAppSelector((state) => state.sideBarData.leftSideBar);
  const type = props?.view;

  const members = useAppSelector((state) => state.selectedUsers);
  const membersCount = members.length;

  return (
    <Container>
      {(type === "channel" || type === "group") && (
        <CreateGroupForm type={type} />
      )}

      {membersCount > 0 && (
        <StyledUsersList>
          <Count>{`${membersCount} ${type === "channel" ? "subscriber" : "member"}${membersCount > 1 ? "s" : ""}`}</Count>
          {members?.map((user) => (
            <User view="display" key={user._id} user={user} />
          ))}
        </StyledUsersList>
      )}
    </Container>
  );
}
