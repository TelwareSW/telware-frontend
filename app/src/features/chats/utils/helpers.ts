import { DetailedChatInterface } from "@state/messages/chats";
import { ChatMember } from "@mocks/data/chats";

export function getChatByID({
  chats,
  chatID
}: {
  chats: DetailedChatInterface[];
  chatID: string;
}): DetailedChatInterface | undefined {
  return chats.find((chat) => chat._id === chatID);
}

export function parseChatsToState(chatData?: any) {
  if (!chatData) return [];
  return chatData?.chats?.map((chat: any): DetailedChatInterface => {
    const { isMuted, draft, chat: currChat } = chat;
    const {
      _id: chatId,
      isSeen,
      members,
      type,
      isDeleted,
      numberOfMembers,
      name,
      encryptionKey,
      initializationVector,
      messagingPermission,
      downloadingPermission
    } = currChat;

    const filteredMembers = members?.map((member: any) => {
      return {
        _id: member.user,
        Role: member.Role
      } as ChatMember;
    });

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
        contentType: incomingLastMessage?.contentType
      },

      messages: [],
      isTyping: false,
      showCheckBox: false,
      selectedMessages: [],

      encryptionKey,
      initializationVector,
      messagingPermission,
      downloadingPermission
    } as DetailedChatInterface;
  });
}

const hexToArrayBuffer = (hex: string) => {
  const match = hex.match(/.{1,2}/g);
  return new Uint8Array(match ? match.map((byte) => parseInt(byte, 16)) : [])
    .buffer;
};

const arrayBufferToHex = (buffer: ArrayBuffer) => {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const encryptMessage = async ({
  message,
  keyHex,
  ivHex
}: {
  message: string;
  keyHex: string;
  ivHex: string;
}) => {
  try {
    const keyBuffer = hexToArrayBuffer(keyHex);
    const ivBuffer = hexToArrayBuffer(ivHex);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-CBC", length: 256 },
      false,
      ["encrypt"]
    );

    const messageBuffer = new TextEncoder().encode(message);

    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: "AES-CBC", iv: ivBuffer },
      cryptoKey,
      messageBuffer
    );

    return arrayBufferToHex(encryptedBuffer);
  } catch (err: any) {
    return Error(`Decryption error: ${err.message}`);
  }
};

export const decryptMessage = async ({
  encryptedMessageHex,
  keyHex,
  ivHex
}: {
  encryptedMessageHex: string;
  keyHex: string;
  ivHex: string;
}) => {
  try {
    const keyBuffer = hexToArrayBuffer(keyHex);
    const ivBuffer = hexToArrayBuffer(ivHex);
    const encryptedBuffer = hexToArrayBuffer(encryptedMessageHex);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-CBC", length: 256 },
      false,
      ["decrypt"]
    );

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv: ivBuffer },
      cryptoKey,
      encryptedBuffer
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (err: any) {
    return Error(`Decryption error: ${err.message}`);
  }
};
