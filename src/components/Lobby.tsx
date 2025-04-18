import React, { useState } from 'react';

interface Props {
  gameCode: string | null;
  isCreator: boolean;
  onCreateGame: () => void;
  onJoinGame: (code: string) => void;
  onStartGame: () => void;
  players: { id: string, score: number }[];
}

export const Lobby: React.FC<Props> = ({ 
  gameCode, 
  isCreator, 
  onCreateGame, 
  onJoinGame,
  onStartGame,
  players
}) => {
  const [joinCode, setJoinCode] = useState('');

  // If we're not in a game yet (no game code), show the create/join options
  if (!gameCode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-100 p-4">
        <div className="fixed top-20 left-20 w-24 h-24 rounded-full bg-blue-200 opacity-30 animate-pulse hidden md:block"></div>
        <div className="fixed bottom-20 right-20 w-32 h-32 rounded-full bg-purple-200 opacity-30 animate-pulse hidden md:block"></div>
        
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-purple-100 relative z-10">
          <div className="text-center">
            <div className="inline-block p-4 rounded-full bg-purple-100 mb-5">
              <span className="text-5xl">🧠</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-6">Knowledge Battle</h1>
            
            <div className="flex flex-col gap-4 mt-8">
              <button 
                onClick={onCreateGame}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 
                  text-white rounded-xl transition-colors shadow-md text-lg font-medium"
              >
                Create New Game
              </button>
              
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Enter game code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  className="w-full p-3 pr-24 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 
                    focus:border-transparent focus:outline-none text-gray-700"
                  maxLength={6}
                />
                <button
                  onClick={() => joinCode.length === 6 && onJoinGame(joinCode)}
                  disabled={joinCode.length !== 6}
                  className="absolute right-2 top-2 bottom-2 px-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
                    text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Join Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // If we have a game code, show the waiting lobby
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-100 p-4">
      <div className="fixed top-20 left-20 w-24 h-24 rounded-full bg-blue-200 opacity-30 animate-pulse hidden md:block"></div>
      <div className="fixed bottom-20 right-20 w-32 h-32 rounded-full bg-purple-200 opacity-30 animate-pulse hidden md:block"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-purple-100 relative z-10">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-purple-100 mb-5">
            <span className="text-5xl">🧠</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-3">Knowledge Battle</h1>
          
          {/* Game code display */}


{/* Game code display */}
<div className="mt-4 mb-6 flex flex-col items-center">
  <p className="text-sm font-medium text-gray-500 mb-2">GAME CODE</p>
  <div className="bg-gray-50 py-3 px-6 rounded-lg border border-gray-200 flex items-center justify-center gap-3">
    <div className="flex gap-1">
      {gameCode.split('').map((char, i) => (
        <span key={i} className="text-2xl font-mono font-bold text-purple-800">{char}</span>
      ))}
    </div>
    <button 
      onClick={() => {
        navigator.clipboard.writeText(gameCode);
        // Show temporary feedback
        const button = document.getElementById('copy-button');
        if (button) {
          const originalText = button.innerText;
          button.innerText = 'Copied!';
          button.classList.add('bg-green-500');
          setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove('bg-green-500');
          }, 1500);
        }
      }}
      id="copy-button"
      className="ml-2 p-2 rounded-md bg-purple-100 hover:bg-purple-200 transition-colors text-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
      title="Copy game code to clipboard"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
      </svg>
    </button>
  </div>
  <p className="text-sm text-gray-500 mt-2">Share this code with friends to join</p>
</div>


          
          <p className="text-lg text-gray-600 mb-6">
            {isCreator ? 'Waiting for players to join...' : 'Waiting for host to start the game...'}
          </p>
          
          {/* Player count indicator */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow-inner">
            <p className="text-gray-700 font-medium">Players in lobby</p>
            <div className="flex justify-center mt-3 space-x-3">
              {players.map((player, index) => (
                <div key={player.id} className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
              ))}
              {players.length < 2 && (
                <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 animate-pulse">?</div>
              )}
            </div>
          </div>
          
          {/* Start game button (only for creator) */}
          {isCreator && players.length >= 2 && (
            <button 
              onClick={onStartGame}
              className="w-full py-3 mt-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                text-white rounded-xl transition-colors shadow-md text-lg font-medium"
            >
              Start Game
            </button>
          )}
          
          {isCreator && players.length < 2 && (
            <p className="text-sm text-gray-500 mt-8">
              Waiting for at least one more player to join...
            </p>
          )}
          
          {!isCreator && (
            <p className="text-sm text-gray-500 mt-8">
              The host will start the game when everyone is ready.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};