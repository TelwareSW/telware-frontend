export enum MessageStatus {
  "sent",
  "delivered",
  "seen",
  "error",
}

export type ContentType =
  | "text"
  | "image"
  | "GIF"
  | "sticker"
  | "audio"
  | "video"
  | "file"
  | "link";

export interface MessageInterface {
  _id: string;

  //TODO: needs to be Date
  timestamp: string;
  content: string;
  contentType: ContentType;
  isPinned: boolean;
  isForward: boolean;
  isAnnouncement: boolean;
  senderId: string;
  chatId: string;

  parentMessageId: string | undefined;
  isReply: boolean;
  status: MessageStatus;

  media?: string;
}

export enum StickerTap {
  gif,
  emoji,
  sticker,
}
