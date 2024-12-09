import styled from "styled-components";

const StyledList = styled.ul<{ $isMine: boolean }>`
  position: absolute;
  min-width: 150px;
  height: 6rem;

  right: ${(props) => !props.$isMine && -6.5}rem;
  left: ${(props) => props.$isMine && -6.5}rem;

  z-index: 20 !important;
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

interface Props {
  $isMine: boolean;
  forwardOnClick: () => void;
  replyOnClick: () => void;
  editOnClick: () => void;
  pinOnClick: () => void;
  isPinned: boolean;
}

function MessageOptionList(props: Props) {
  const {
    $isMine,
    forwardOnClick,
    replyOnClick,
    editOnClick,
    pinOnClick,
    isPinned,
  } = props;

  return (
    <StyledList $isMine={$isMine} data-testid="message-option-list">
      <HoverMask onClick={forwardOnClick} data-testid="forward-option">
        <StyledP>Forward</StyledP>
      </HoverMask>
      <HoverMask onClick={replyOnClick} data-testid="reply-option">
        <StyledP>Reply</StyledP>
      </HoverMask>
      {$isMine && (
        <HoverMask onClick={editOnClick} data-testid="edit-option">
          <StyledP>Edit</StyledP>
        </HoverMask>
      )}
      <HoverMask onClick={pinOnClick} data-testid="pin-option">
        <StyledP>{isPinned ? "Unpin" : "Pin"}</StyledP>
      </HoverMask>
    </StyledList>
  );
}
export default MessageOptionList;
