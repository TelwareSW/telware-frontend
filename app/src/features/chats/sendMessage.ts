import { useSocket } from "@hooks/useSocket";
import { addMessage } from "@state/messages/messages";
import { RootState } from "@state/store";
import { useDispatch, useSelector } from "react-redux";

const { sendMessage } = useSocket();
const dispatch = useDispatch();
const userId = useSelector((state: RootState) => state.user.userInfo.id);

export function handleSendMessage(data: string) {
  if (data) {
    const message = {
      id: "19008",
      content: data,
      senderId: userId,
      type: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      chatId: "",
      parentMessageId: "",
      isDeleted: false,
      deleteType: 2,
      status: 0,
      isOptionListOpen: false,
    };
    sendMessage(message);
    dispatch(addMessage(message));
  }
}
