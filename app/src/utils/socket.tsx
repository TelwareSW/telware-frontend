import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@features/authentication/login/hooks/useUser";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socketInstance: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

function getSocket() {
  const { user, isPending } = useUser();
  const [socket, setSocket] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  console.log(localStorage.getItem("sessionId"));

  useEffect(() => {
    if (!isPending && user && !socketInstance) {
      console.log("Initializing socket with user:", user);
      console.log(user._id);

      socketInstance = io(`${import.meta.env.VITE_SOCKET_BACKEND_API}`, {
        query: {
          userId: user._id,
        },
        auth: {
          sessionId: localStorage.getItem("sessionId"),
        },
      });

      setSocket(socketInstance);

      // Cleanup on unmount
      return () => {
        console.log("Disconnecting socket");
        socketInstance?.disconnect();
        socketInstance = null;
      };
    }
  }, [user, isPending]);

  return socket;
}

export { getSocket };
