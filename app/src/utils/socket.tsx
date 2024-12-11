import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@features/authentication/login/hooks/useUser";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socketInstance: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

function useSocket() {
  const { user, isPending } = useUser();
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    if (!isPending && user && !socketInstance) {
      socketInstance = io(`${import.meta.env.VITE_SOCKET_BACKEND_API}`, {
        query: {
          userId: user._id,
        },
        auth: {
          sessionId: localStorage.getItem("sessionId"),
        },
      });

      setSocket(socketInstance);

      return () => {
        console.log("Disconnecting socket");
        socketInstance?.disconnect();
        socketInstance = null;
      };
    }
  }, [user, isPending]);

  return socket;
}

export { useSocket };
