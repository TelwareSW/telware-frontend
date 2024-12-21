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

  parentMessageId: string | null;
  status: MessageStatus;
  isAppropriate: boolean;

  media?: string;

  //TODO: should use parentMessageId
  isReply: boolean;
  threadMessages: string[];
  isMention: boolean;
  isSeen: boolean;
}

export enum StickerTap {
  gif,
  emoji,
  sticker,
}
export interface Gif {
  id: string;
  title: string;
  url: string;
}
export interface Sticker {
  id: string;
  title: string;
  url: string;
}
