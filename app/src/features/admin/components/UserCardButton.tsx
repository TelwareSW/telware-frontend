import styled from "styled-components";
import { userStatus } from "types/admin";
import Button from "@components/Button";
import Modal from "@components/Modal";
import { useState } from "react";
import { set } from "react-hook-form";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");
  let renderedButtons;
  const handleDeactivate = () => {
    setAction("deactivate");
    setIsModalOpen(true);
  };
  const handleBan = () => {
    setAction("ban");
    setIsModalOpen(true);
  };
  switch (status) {
    case userStatus.active:
      renderedButtons = (
        <>
          <Button
            onClick={handleDeactivate}
            $type="normal"
            $width="15rem"
            data-testid="deactivate-button"
          >
            Deactivate
          </Button>
          <Button
            $type="danger"
            $width="15rem"
            datatype="ban-button"
            onClick={handleBan}
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
            data-testid="activate-button"
          >
            Activate
          </Button>
          <Button
            onClick={handleBan}
            $type="danger"
            $width="15rem"
            data-testid="ban-button"
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
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        message={`You are going to ${action} this user${action === "ban" ? "for ever" : ""}.`}
        title={`${action} User`}
        onClose={() => setIsModalOpen(false)}
      >
        <Button
          onClick={() =>
            onChangeStatus(
              action === "ban" ? userStatus.banned : userStatus.deactivated
            )
          }
          $type="danger"
          $width="10rem"
          data-testid="ban-button"
          style={{ margin: "auto" }}
        >
          {action}
        </Button>
      </Modal>
      <ButtonContainer>{renderedButtons}</ButtonContainer>
    </>
  );
}

export default UserCardButton;
