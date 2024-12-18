import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Heading from "@components/Heading";
import styled from "styled-components";
import { userStatus } from "types/admin";

interface UserCardProps {
  id: string;
  userName: string;
  photo: string;
  status: userStatus;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
  border-radius: 0.8rem;
  background-color: var(--admin-card-bg--active);
`;
const P = styled.p<{ $status: string }>`
  color: ${({ $status }) =>
    $status === userStatus.active ? "var(--accent-color)" : "red"};
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
  const handleUserStatusChange = (id: string, status: string) => {
    console.log(id, status);
  };

  return (
    <Card>
      <Avatar image={photo} name={userName} />
      <UserInfo>
        <Heading as="h4">{userName}</Heading>
        <P $status={status}>{status}</P>
      </UserInfo>
      {
        <Button onClick={() => handleUserStatusChange(id, status)}>
          {status === userStatus.active ? "Deactivate" : "Activate"}
        </Button>
      }
    </Card>
  );
}

export default UserCard;
