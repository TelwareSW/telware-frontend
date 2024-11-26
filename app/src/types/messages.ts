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
  createdAt: Date;
  updatedAt: Date;
  chatId: string;
  parentMessageId: string;
  isDeleted: boolean;
  deleteType: DeleteType;
  status: MessageStatus;
}
