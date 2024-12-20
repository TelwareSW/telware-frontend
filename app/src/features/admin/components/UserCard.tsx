import styled from "styled-components";
import { userStatus } from "types/admin";
import { useBanUser } from "../hooks/useBanUser";
import { useActivateUser } from "../hooks/useActivateUser";
import { useDeactivateUser } from "../hooks/useDeactivateUser";
import Avatar from "@components/Avatar";
import Heading from "@components/Heading";
import UserCardButton from "./UserCardButton";

interface UserCardProps {
  id: string;
  userName: string;
  photo: string;
  status: userStatus;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 2.4rem;
  border-radius: 0.8rem;
  background-color: var(--admin-sidebar-bg);
  height: 15rem;
  width: 21rem;
`;
const P = styled.p<{ $status: userStatus }>`
  color: ${({ $status }) =>
    $status === userStatus.active
      ? "var(--admin-card-active)"
      : "var(--color-error)"};
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

function UserCard(props: UserCardProps) {
  const { id, userName, photo, status } = props;
  const { activateUser } = useActivateUser();
  const { deactivateUser } = useDeactivateUser();
  const { banUser } = useBanUser();
  const handleUserStatusChange = (status: string) => {
    switch (status) {
      case userStatus.active:
        activateUser(id);
        break;
      case userStatus.deactivated:
        deactivateUser(id);
        break;
      case userStatus.banned:
        banUser(id);
        break;
      default:
        break;
    }
  };
  const displayedName =
    userName?.length > 9 ? `${userName?.slice(0, 9)}...` : userName;

  return (
    <Card>
      <UserInfo>
        <Avatar image={photo} name={userName} />
        <>
          <Heading as="h4">{displayedName}</Heading>
          <P $status={status}>{status}</P>
        </>
      </UserInfo>
      <UserCardButton status={status} onChangeStatus={handleUserStatusChange} />
    </Card>
  );
}

export default UserCard;
