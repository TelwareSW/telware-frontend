import { useAppSelector } from "@hooks/useGlobalState";
import { useEffect, useRef } from "react";

function useScrollToLastMsg() {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messages = useAppSelector((state) => state.chats.chats[0].messages);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { lastMessageRef };
}

export default useScrollToLastMsg;
