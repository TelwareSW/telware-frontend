import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@features/authentication/login/hooks/useUser";
import { DefaultEventsMap } from "@socket.io/component-emitter";

function initializeSocket(
  userId: string,
  sessionId: string | null
): Socket<DefaultEventsMap, DefaultEventsMap> {
  const socket = io(`${import.meta.env.VITE_SOCKET_BACKEND_API}`, {
    query: {
      userId
    },
    auth: {
      sessionId
    }
  });

  console.log("Socket initialized");

  return socket;
}

function useSocket() {
  const { user, isPending } = useUser();
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  useEffect(() => {
    if (!isPending && user && !socketRef.current) {
      const sessionId = localStorage.getItem("sessionId");
      socketRef.current = initializeSocket(user._id, sessionId);

      return () => {
        ("Disconnecting socket");
        socketRef.current?.disconnect();
        socketRef.current = null;
      };
    }
  }, [user, isPending]);

  return socketRef.current;
}

export { useSocket };
