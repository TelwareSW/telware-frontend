import { useSocket } from "@hooks/useSocket";

export const useDeleteMessage = () => {
  const { deleteMessage } = useSocket();

  const handleDeleteMessage = (messageId: string, chatId: string) => {
    deleteMessage({ messageId, chatId });
  };

  return { handleDeleteMessage };
};
