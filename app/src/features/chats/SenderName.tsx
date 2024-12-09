import { useAppSelector } from "@hooks/useGlobalState";
import styled from "styled-components";
import { useChatMembers } from "./hooks/useChatMember";
import { useParams } from "react-router-dom";

const Name = styled.div<{ $colorIndex: number }>`
  color: var(--color-peer-${({ $colorIndex }) => $colorIndex});
`;

type SenderNameProps = {
  $isMine: boolean;
  senderId: string;
};

function SenderName({ $isMine, senderId }: SenderNameProps) {
  const { chatId } = useParams<{ chatId: string }>();
  const chat = useAppSelector((state) =>
    state.chats.chats.find((chat) => chat?._id === chatId)
  );

  const members = useChatMembers(chat?.members);

  const memberIndex = members.findIndex((member) => member._id === senderId);
  const memberData = members[memberIndex];

  const colorIndex = (memberIndex % 5) + 2;

  if ($isMine || chat?.type === "private") return null;

  return (
    <Name $colorIndex={colorIndex}>
      {`${memberData?.screenFirstName} ${memberData?.screenLastName}`}
    </Name>
  );
}

export default SenderName;
