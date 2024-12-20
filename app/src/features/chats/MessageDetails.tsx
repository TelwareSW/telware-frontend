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
  padding-top: 0.2rem;
  display: flex;
  align-self: flex-end;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.6rem;
  color: var(--color-text-secondary);
`;

function MessageDetails() {
  const { isPinned, isMine, timestamp, chatType, sender, numberOfMembers } =
    useMessageContext();

  return (
    <Details>
      {chatType === "channel" && (
        <>
          <span>{sender?.username}</span>
          <span>{numberOfMembers}</span>
          <span>
            {getIcon("Eye", {
              sx: { fontSize: "0.8rem", color: "var(--color-text-secondary)" },
            })}
          </span>
        </>
      )}

      {isPinned &&
        getIcon("PushPin", {
          sx: { fontSize: "0.8rem", color: "var(--color-text-secondary)" },
        })}
      <TimeStamp $isMine={chatType === "channel" ? false : isMine}>
        {new Date(timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </TimeStamp>
    </Details>
  );
}

export default MessageDetails;
