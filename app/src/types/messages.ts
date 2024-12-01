export enum MessageStatus {
  "sent",
  "delivered",
  "seen",
  "error",
}

export interface MessageInterface {
  _id: string;
  timestamp: string;
  content: string;
  contentType: string;
  isPinned: boolean;
  isForward: boolean;
  isAnnouncement: boolean;
  senderId: string;
  chatId: string;

  parentMessageId: string;
  status: MessageStatus;
  isReply: boolean;
  replyMessageId: string | null;
  media?: string;
}
