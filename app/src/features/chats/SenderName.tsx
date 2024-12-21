import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAppSelector } from "@hooks/useGlobalState";
import { useChatMembers } from "./hooks/useChatMembers";

import { useMessageContext } from "./contexts/MessageProvider";

const Name = styled.div<{ $colorIndex: number }>`
  color: var(--color-peer-${({ $colorIndex }) => $colorIndex});
`;

function SenderName() {
  const { chatId } = useParams<{ chatId: string }>();
  const { senderId, isMine } = useMessageContext();

  const chat = useAppSelector((state) =>
    state.chats.chats.find((chat) => chat?._id === chatId)
  );

  const members = useChatMembers(chat?.members);

  const memberIndex = members.findIndex((member) => member._id === senderId);
  const memberData = members[memberIndex];

  const colorIndex = (memberIndex % 5) + 2;

  if (isMine || chat?.type === "private") return null;

  return (
    <Name $colorIndex={colorIndex}>
      {`${memberData?.screenFirstName} ${memberData?.screenLastName}`}
    </Name>
  );
}

export default SenderName;
