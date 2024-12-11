import styled from "styled-components";

import { getIcon } from "@data/icons";

import { useMessageContext } from "./contexts/MessageProvider";

const TimeStamp = styled.div<{ $isMine: boolean }>`
  font-size: x-small;
  font-size: x-small;
  color: ${({ $isMine }) =>
    $isMine ? "var(--color-text)" : "var(--color-text-secondary)"};

  float: none;
  display: block;

  float: none;
  display: block;
`;

const Details = styled.div`
  display: flex;
  align-self: flex-end;

  gap: 0.2rem;
`;

function MessageDetails() {
  const { isPinned, isMine } = useMessageContext();

  return (
    <Details>
      {isPinned && getIcon("PushPin", { sx: { fontSize: "1rem" } })}
      <TimeStamp $isMine={isMine}>11:09AM</TimeStamp>
    </Details>
  );
}

export default MessageDetails;
