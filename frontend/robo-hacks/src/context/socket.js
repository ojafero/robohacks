import { io } from "socket.io-client";

import React from "react";

export const socket = io("http://localhost:5000");
socket.on("connect", () => {
  console.log("connected to server");
});
export const SocketContext = React.createContext();
