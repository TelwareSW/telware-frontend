import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { getChatByID } from "../utils/helpers";
import { useEffect, useMemo, useState } from "react";
import { MessageInterface } from "types/messages";
import { setIsMention, setIsSeen } from "@state/messages/chats";

function useTraversalMentions() {
  const { chatId } = useParams<{ chatId: string }>();
  const chats = useAppSelector((state) => state.chats.chats);
  const chat = getChatByID({ chats: chats, chatID: chatId! });
  const chatMessages = chat?.messages;
  const mentionRegex = /@\[[^\]]+\]\(([^)]+)\)/g;

  const user = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();

  const [mentionMessages, setMentionMessages] = useState<MessageInterface[]>(
    []
  );

  const [currentMentionIndex, setCurrentMentionIndex] = useState(0);

  const currentMentionMessage = useMemo(() => {
    return mentionMessages[currentMentionIndex];
  }, [mentionMessages, currentMentionIndex]);

  useEffect(() => {
    if (chatMessages) {
      const mentions = chatMessages.filter(
        (message) => message.isMention && !message.isSeen
      );

      const userMentions = mentions
        .filter((mention) => {
          const match = mentionRegex.exec(mention.content);
          return match?.[1] === user.username;
        })
        .map((mention) => mention._id);

      const filteredMentions = mentions.filter((mention) =>
        userMentions.includes(mention._id)
      );

      setMentionMessages(filteredMentions);
    }
  }, [chatMessages]);

  const handleNextMentionMessage = () => {
    if (mentionMessages.length > 0) {
      setCurrentMentionIndex(
        (prevIndex) => (prevIndex + 1) % mentionMessages.length
      );
      document
        .querySelector("[data-message-id='" + currentMentionMessage?._id + "']")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      const updatedMessages = [...mentionMessages];
      updatedMessages.splice(currentMentionIndex, 1);
      setIsMention({
        chatId: chatId!,
        isMention: false,
        messageId: currentMentionMessage._id,
      });
      setMentionMessages(updatedMessages);
      dispatch(
        setIsSeen({
          chatId: chatId!,
          messageId: currentMentionMessage._id,
          isSeen: true,
        })
      );
    }
  };
  return { handleNextMentionMessage, mentionMessages };
}

export default useTraversalMentions;
