import { useAppDispatch } from "@hooks/useGlobalState";
import { setActiveMessage } from "@state/messages/activeMessage";

function useOptionListAction({
  id,
  content,
  parentMessageId,
}: {
  id: string;
  content: string;
  parentMessageId: string | null;
}) {
  const dispatch = useAppDispatch();
  function handleEditMessage() {
    dispatch(setActiveMessage({ id, content, state: "edit" }));
  }

  function handleReply() {
    dispatch(setActiveMessage({ id, content, state: "reply" }));
  }

  function MoveToReplyMessage() {
    const targetMsg = document.querySelector(
      "[data-message-id='" + parentMessageId + "']"
    );

    if (targetMsg) {
      targetMsg.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      targetMsg.classList.add("highlight");

      setTimeout(() => {
        targetMsg.classList.remove("highlight");
      }, 2000);
    }
  }
  return { handleEditMessage, handleReply, MoveToReplyMessage };
}

export default useOptionListAction;
