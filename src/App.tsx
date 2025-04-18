// src/App.tsx
import React from 'react';
import { Game } from './components/Game';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <SocketProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Game />
      </div>
    </SocketProvider>
  );
}

export default App;
