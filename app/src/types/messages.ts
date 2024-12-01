export enum MessageTypes {
  "announcement",
  "forward",
  "normal",
}

export enum DeleteType {
  "all",
  "only-me",
  "none",
}

export enum MessageStatus {
  "sent",
  "delivered",
  "seen",
  "error",
}

export interface MessageInterface {
  id: string;
  content: string;
  senderId: string;
  type: MessageTypes;
  createdAt: string;
  updatedAt: string;
  chatId: string;
  parentMessageId: string;
  isDeleted: boolean;
  isPinned: boolean;
  deleteType: DeleteType;
  status: MessageStatus;
  isOptionListOpen: boolean;
  isReply: boolean;
  replyMessageId: string | null;
  media: string;
}

export enum StickerTap {
  gif,
  emoji,
  sticker,
}
