import { otherUserInfoInterface } from "./user";

interface story {
  id: string;
  user: otherUserInfoInterface;
  content: string;
  timestamp: string;
  caption?: string;
  views?: otherUserInfoInterface[];
  viewed?: boolean;
}

export type { story };
