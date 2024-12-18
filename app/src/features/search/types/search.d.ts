export type SearchFilter =
  | "text"
  | "image"
  | "GIF"
  | "sticker"
  | "audio"
  | "video"
  | "file"
  | "link";

export type SearchSpace = "chats" | "groups" | "channels";

export type SearchRequest = {
  query: string;
  filter: SearchFilter[];
  searchSpace: SearchSpace[];
  isGlobalSearch: boolean;
};

export type SearchResultMessage = {
  id: string;
  content: string;
  media: string;
  contentType: SearchFilter;
  senderId: {
    username: string;
    screenFirstName: string;
    screenLastName: string;
    photo: string;
  };
  chatId: {
    id: string;
    name: string;
    numberOfMembers: number;
    type: string;
    photo?: string;
  };
  timestamp: string;
};

export type SearchResultGroup = {
  id: string;
  name: string;
  photo: string;
  type: string;
  numberOfMembers: number;
};

export type SearchResultChannel = {
  id: string;
  name: string;
  photo: string;
  type: string;
  numberOfMembers: number;
};

export type SearchResultUser = {
  id: string;
  username: string;
  photo: string;
  screenFirstName: string;
  screenLastName: string;
};

export type SearchResponseData = {
  searchResult: SearchResultMessage[];
  globalSearchResult: {
    users: SearchResultUser[];
    groups: SearchResultGroup[];
    channels: SearchResultChannel[];
  };
};

export type SearchTabType = {
  title: string;
  component: () => JSX.Element;
  filter: SearchFilter[];
  searchSpace: SearchSpace[];
  isGlobalSearch: boolean;
};
