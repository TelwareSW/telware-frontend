import { useAppDispatch } from "@hooks/useGlobalState";
import { setShowCheckBox } from "@state/messages/chats";
import { useState } from "react";
import { useParams } from "react-router-dom";

function useShowForward() {
  const { chatId } = useParams<{ chatId: string }>();

  const dispatch = useAppDispatch();
  const [showForwardUsers, setShowForwardUsers] = useState(false);

  function handleClose() {
    if (!chatId) {
      return;
    }

    setShowForwardUsers(false);
    dispatch(setShowCheckBox({ chatId: chatId, showCheckBox: false }));
  }

  return { showForwardUsers, setShowForwardUsers, handleClose };
}

export default useShowForward;
