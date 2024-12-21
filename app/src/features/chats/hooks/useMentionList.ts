import { useAppSelector } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";
import { getChatByID } from "../utils/helpers";
import { useChatMembers } from "./useChatMembers";

function useMentionList() {
  const { chatId } = useParams<{ chatId: string }>();
  const chats = useAppSelector((state) => state.chats.chats);
  const chat = getChatByID({ chats: chats, chatID: chatId! });

  const chatMembers = useChatMembers(chat?.members);
  const filteredMembers = chatMembers.map((member) => ({
    id: member.username,
    display: `${member.screenFirstName} ${member.screenLastName}`,
  }));

  return { filteredMembers };
}

export default useMentionList;
