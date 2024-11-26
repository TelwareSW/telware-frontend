import { DefaultEventsMap } from "@socket.io/component-emitter";
import { io, Socket } from "socket.io-client";

let socketInstance: Socket<DefaultEventsMap, DefaultEventsMap>;

export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = io(`${import.meta.env.VITE_SOCKET_BACKEND_API}`, {});
  }
  return socketInstance;
};
