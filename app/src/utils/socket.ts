import { io } from "socket.io-client";

const socket = io(`${import.meta.env.VITE_SOCKET_BACKEND_API}`); //for testing

export default socket;
