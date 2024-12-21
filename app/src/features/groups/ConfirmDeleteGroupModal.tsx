import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Checkbox from "@components/Checkbox";
import Modal from "@components/Modal";

import { useSocket } from "@hooks/useSocket";
import { useRightSideBarContext } from "./contexts/RightSideBarProvider";
import { resetRightSideBar } from "@state/side-bar/sideBar";
import { useGroupInfo } from "./hooks/useGroupInfo";

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  cursor: pointer;

  width: 100%;
  padding: 0.5rem 1rem;

  border-radius: var(--border-radius-default-tiny);

  & span {
    color: var(--color-text);
  }

  &:hover {
    background-color: var(--color-item-hover);
  }
`;

const Button = styled.button<{ $type?: string }>`
  border: none;
  border-radius: var(--border-radius-default-tiny);
  padding: 0.5rem 1rem;

  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 1rem;

  background-color: transparent;
  color: ${({ $type }) =>
    $type === "error" ? "var(--color-error)" : "var(--accent-color)"};

  &:hover {
    background-color: ${({ $type }) =>
      $type === "error"
        ? "var(--color-error-shade)"
        : "var(--color-item-hover)"};
  }
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ConfirmDeleteGroupModal({ isOpen, onClose }: ModalProps) {
  const [checked, setChecked] = useState(false);
  const { leaveGroup, deleteGroup } = useSocket();
  const { setIsRightSideBarOpen } = useRightSideBarContext();
  const dispatch = useDispatch();
  const { chatId, isCurrUserAdmin } = useGroupInfo();

  function handleDelete() {
    if (checked) {
      deleteGroup({ chatId: chatId! });
    } else {
      leaveGroup({ chatId: chatId! });
    }
    dispatch(resetRightSideBar());
    setIsRightSideBarOpen(false);
  }

  return (
    <Modal
      title="Delete Group"
      onClose={onClose}
      isOpen={isOpen}
      message="Are you sure you want to delete and leave this group?"
    >
      {isCurrUserAdmin && (
        <CheckboxContainer onClick={() => setChecked((prev) => !prev)}>
          <Checkbox
            data-testid="delete-for-all-checkbox"
            // onChange={() => setChecked((prev) => !prev)}
            checked={checked}
          />
          <span>delete for all users</span>
        </CheckboxContainer>
      )}
      <Buttons>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          data-testid="delete-button"
          $type="error"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Buttons>
    </Modal>
  );
}

export default ConfirmDeleteGroupModal;
