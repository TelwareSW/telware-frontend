export enum MessageStatus {
  "sent",
  "delivered",
  "seen",
  "error",
}

export interface MessageInterface {
  _id: string;

  //TODO: needs to be Date
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
  
  media?: string;

  //TODO: should use parentMessageId
  isReply: boolean;
  replyMessageId: string | null;
}

export enum StickerTap {
  gif,
  emoji,
  sticker,
}
