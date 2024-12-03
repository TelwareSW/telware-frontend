import { DetailedChatInterface } from "@state/messages/chats";
import { ChatDataType } from "@mocks/data/chats";

export function getChatByID({
  chats,
  chatID,
}: {
  chats: DetailedChatInterface[];
  chatID: string;
}): DetailedChatInterface | undefined {
  return chats.find((chat) => chat._id === chatID);
}

export function parseChatsToState(chatData?: ChatDataType) {
  if (!chatData) return [];

  return chatData.chats.map((chat) => ({
    ...chat,
    lastMessage: chatData.lastMessages.find(
      (lastMessage) => lastMessage.chatId === chat._id
    )?.lastMessage,
    messages: [],
    isTyping: false,
    showCheckBox: false,
    selectedMessages: [],
  }));
}
