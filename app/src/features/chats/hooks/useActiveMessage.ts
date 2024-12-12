import { useAppSelector } from "@hooks/useGlobalState";
import { useEffect } from "react";

function useActiveMessage({ setInput }: { setInput: (value: string) => void }) {
  const activeMessage = useAppSelector((state) => state.activeMessage);
  useEffect(() => {
    if (activeMessage.state === "edit" && activeMessage?.content)
      setInput(activeMessage?.content);
  }, [activeMessage]);

  return { activeMessage };
}

export default useActiveMessage;
