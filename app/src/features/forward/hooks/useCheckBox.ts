import { getChatByID } from "@features/chats/helpers";
import { useAppSelector, useAppDispatch } from "@hooks/useGlobalState";
import { SelectMessage, removeSelectedMessage } from "@state/messages/chats";
import { useState, useEffect } from "react";

function useCheckBox({
  chatId,
  messageId,
}: {
  chatId: string;
  messageId: string;
}) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const chats = useAppSelector((state) => state.chats.chats);
  const showCheckBox = chatId
    ? getChatByID({ chats: chats, chatID: chatId })?.showCheckBox
    : undefined;

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (showCheckBox !== undefined) setIsChecked(isChecked && showCheckBox);
  }, [showCheckBox, messageId, chatId]);

  function toggleCheckBox() {
    if (!isChecked) {
      dispatch(SelectMessage({ chatId, id: messageId }));
    } else {
      dispatch(removeSelectedMessage({ chatId, id: messageId }));
    }
    setIsChecked(!isChecked);
  }

  return {
    isChecked,
    toggleCheckBox,
    showCheckBox,
  };
}

export default useCheckBox;
