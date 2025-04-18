// src/context/SocketContext.tsx
import React, { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io("http://localhost:3000"); // Update with backend URL

export const SocketContext = createContext<Socket>(socket);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  ); 
};
