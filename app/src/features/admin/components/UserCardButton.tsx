import styled from "styled-components";
import { userStatus } from "types/admin";
import Button from "@components/Button";

interface Props {
  status: userStatus;
  onChangeStatus: (status: userStatus) => void;
}
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;
`;

function UserCardButton(props: Props) {
  const { status, onChangeStatus } = props;
  let renderedButtons;
  switch (status) {
    case userStatus.active:
      renderedButtons = (
        <>
          <Button
            onClick={() => onChangeStatus(userStatus.deactivated)}
            $type="normal"
            $width="15rem"
          >
            Deactivate
          </Button>
          <Button
            onClick={() => onChangeStatus(userStatus.banned)}
            $type="danger"
            $width="15rem"
          >
            Ban
          </Button>
        </>
      );
      break;
    case userStatus.deactivated:
      renderedButtons = (
        <>
          <Button
            $type="modal"
            $width="15rem"
            onClick={() => onChangeStatus(userStatus.active)}
          >
            Activate
          </Button>
          <Button
            onClick={() => onChangeStatus(userStatus.banned)}
            $type="danger"
            $width="15rem"
          >
            Ban
          </Button>
        </>
      );
      break;
    default:
      renderedButtons = null;
      break;
  }
  return <ButtonContainer>{renderedButtons}</ButtonContainer>;
}

export default UserCardButton;
