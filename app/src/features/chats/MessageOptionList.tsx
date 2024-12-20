import styled from "styled-components";
import { useMessageContext } from "./contexts/MessageProvider";
import useOptionListAction from "./hooks/useOptionListAction";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import {
  pinMessage,
  setShowCheckBox,
  unpinMessage,
} from "@state/messages/chats";
import { useSocket } from "@hooks/useSocket";
import useCheckBox from "@features/forward/hooks/useCheckBox";
import { useDeleteMessage } from "./hooks/useDeleteMessage";

const StyledList = styled.ul<{ $isMine: boolean }>`
  position: absolute;
  min-width: 150px;
  height: 6rem;

  right: ${(props) => !props.$isMine && -6.5}rem;
  left: ${(props) => props.$isMine && -6.5}rem;

  z-index: 10;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: start;

  list-style: none;
  padding: 0.2rem 0.2rem;
  background-color: var(--color-background);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius-default-small);

  height: fit-content;

  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(5px);
`;

const HoverMask = styled.div`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-default-small);
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 0.5rem;
  &:hover {
    background: var(--color-background-compact-menu-hover);
    cursor: pointer;
  }
`;

const StyledP = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
`;

function MessageOptionList() {
  const {
    isMine,
    isPinned,
    _id: id,
    content,
    parentMessageId,
    chatId,
  } = useMessageContext();

  const { handleDeleteMessage } = useDeleteMessage();

  const { handleEditMessage, handleReply } = useOptionListAction({
    id,
    content,
    parentMessageId,
  });

  const { showCheckBox } = useCheckBox({ chatId, messageId: id });

  const userId = useAppSelector((state) => state.user.userInfo.id);

  const dispatch = useAppDispatch();
  const { pinMessage: pinMessageSocket, unpinMessage: unpinMessageSocket } =
    useSocket();

  function handlePin() {
    if (isPinned) {
      dispatch(unpinMessage({ messageId: id, chatId: chatId }));
      unpinMessageSocket(chatId, id, userId);
      return;
    }
    dispatch(pinMessage({ messageId: id, chatId: chatId }));
    pinMessageSocket(chatId, id, userId);
  }

  function handleForward() {
    dispatch(setShowCheckBox({ chatId: chatId, showCheckBox: !showCheckBox }));
  }

  function handleDelete() {
    handleDeleteMessage(id, chatId);
  }

  return (
    <StyledList $isMine={isMine} data-testid="message-option-list">
      <HoverMask onClick={handleForward} data-testid="forward-option">
        <StyledP>Forward</StyledP>
      </HoverMask>
      <HoverMask onClick={handleReply} data-testid="reply-option">
        <StyledP>Reply</StyledP>
      </HoverMask>
      {isMine && (
        <HoverMask onClick={handleEditMessage} data-testid="edit-option">
          <StyledP>Edit</StyledP>
        </HoverMask>
      )}
      <HoverMask onClick={handlePin} data-testid="pin-option">
        <StyledP>{isPinned ? "Unpin" : "Pin"}</StyledP>
      </HoverMask>
      {isMine && (
        <HoverMask onClick={handleDelete} data-testid="delete-option">
          <StyledP>Delete</StyledP>
        </HoverMask>
      )}
    </StyledList>
  );
}
export default MessageOptionList;
