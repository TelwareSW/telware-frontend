import { DetailedChatInterface } from "@state/messages/chats";
import { ChatMember } from "@mocks/data/chats";

export function getChatByID({
  chats,
  chatID,
}: {
  chats: DetailedChatInterface[];
  chatID: string;
}): DetailedChatInterface | undefined {
  return chats.find((chat) => chat._id === chatID);
}

export function parseChatsToState(chatData?: any) {
  if (!chatData) return [];
  return chatData.chats.map((chat: any): DetailedChatInterface => {
    const { isMuted, draft, chat: currChat } = chat;
    const {
      _id: chatId,
      isSeen,
      members,
      type,
      isDeleted,
      numberOfMembers,
      name,
    } = currChat;

    const filteredMembers = members
      .map((member: any) => {
        return {
          _id: member.user,
          Role: member.Role,
        } as ChatMember;
      })


    const incomingLastMessage = chatData.lastMessages.find(
      (lastMessage: any) => lastMessage.chatId === chatId
    )?.lastMessage;

    return {
      _id: chatId,
      isSeen: isSeen,
      isDeleted: isDeleted,
      members: filteredMembers,
      type: type,
      name,
      numberOfMembers: numberOfMembers,

      lastMessage: {
        _id: incomingLastMessage?.id,
        content: incomingLastMessage?.content,
        senderId: incomingLastMessage?.senderId,
        timestamp: incomingLastMessage?.timestamp,
      },

      messages: [],
      isTyping: false,
      showCheckBox: false,
      selectedMessages: [],
    } as DetailedChatInterface;
  });
}
