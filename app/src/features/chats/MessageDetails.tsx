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
  const { isPinned, isMine, timestamp } = useMessageContext();

  return (
    <Details>
      {isPinned && getIcon("PushPin", { sx: { fontSize: "1rem" } })}
      <TimeStamp $isMine={isMine}>
        {new Date(timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </TimeStamp>
    </Details>
  );
}

export default MessageDetails;
