import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@state/store";

function useScrollToLastMsg() {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messages = useSelector((state: RootState) => state.messages.messages);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { lastMessageRef };
}

export default useScrollToLastMsg;
