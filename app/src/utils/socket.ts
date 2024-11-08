import { io } from "socket.io-client";
console.log(import.meta.env.VITE_SOCKET_BACKEND_API);
const socket = io(`${import.meta.env.VITE_SOCKET_BACKEND_API}`);

export default socket;
