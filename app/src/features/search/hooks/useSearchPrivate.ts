import { SearchRequest } from "../types/search";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";
import { useEffect, useState } from "react";

type SearchResult = {
  id?: string;
  content?: string;
  media?: string;
  contentType?: string;
  senderId?: {
    username?: string;
    screenFirstName?: string;
    screenLastName?: string;
    photo?: string;
  };
  chatId?: {
    id?: string;
    name?: string;
    numberOfMembers?: number;
    type?: string;
    photo?: string;
  };
  timestamp?: string;
};
function useSearchPrivate(searchRequest: SearchRequest) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const { chats, members } = useSelector((state: RootState) => state.chats);

  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);

      if (!searchRequest.query) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      const privateChats = chats.filter((chat) => chat.type === "private");
      const messages = privateChats.map((chat) => chat.messages).flat();

      const filteredMessages = messages.filter(
        (message) =>
          searchRequest.filter.includes(message?.contentType) &&
          message?.content
            .toLowerCase()
            .includes(searchRequest.query.toLowerCase()),
      );

      const mergedSearchResults = filteredMessages.map((message) => {
        const sender = members.find(
          (member) => member._id === message.senderId,
        );

        const chat = privateChats.find((chat) => chat._id === message.chatId);

        return {
          id: message._id,
          content: message.content,
          media: message.media,
          contentType: message.contentType,
          senderId: {
            username: sender?.username,
            screenFirstName: sender?.screenFirstName,
            screenLastName: sender?.screenLastName,
            photo: sender?.photo,
          },
          chatId: {
            id: chat?._id,
            name: chat?.name,
            numberOfMembers: chat?.members.length,
            type: chat?.type,
            photo: chat?.photo,
          },
          timestamp: message.timestamp,
        };
      });

      setSearchResults(mergedSearchResults);
      setIsLoading(false);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("An error occurred"));
      setIsLoading(false);
    }
  }, [searchRequest, chats, members]);

  return { searchResults, isLoading, error };
}

export { useSearchPrivate };
