import React from 'react';

export const Lobby = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-100 p-4">
      {/* Decorative elements */}
      <div className="fixed top-20 left-20 w-24 h-24 rounded-full bg-blue-200 opacity-30 animate-pulse hidden md:block"></div>
      <div className="fixed bottom-20 right-20 w-32 h-32 rounded-full bg-purple-200 opacity-30 animate-pulse hidden md:block"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-purple-100 relative z-10">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-purple-100 mb-5">
            <span className="text-5xl">🧠</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-3">Knowledge Battle</h1>
          <p className="text-lg text-gray-600 mb-6">Waiting for opponents to join...</p>
          
          {/* Animated brain wave loader */}
          <div className="flex justify-center items-center space-x-2 my-8">
            <div className="w-2 h-8 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-16 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-20 bg-purple-800 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-2 h-16 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            <div className="w-2 h-8 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
          </div>
          
          {/* Player count indicator */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow-inner">
            <p className="text-gray-700 font-medium">Players in lobby</p>
            <div className="flex justify-center mt-3 space-x-3">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg">1</div>
              <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 animate-pulse">?</div>
            </div>
          </div>
          
          {/* Game info */}
          <p className="text-sm text-gray-500 mt-8">
            Get ready to test your knowledge!
            <br />The game will start automatically when another player joins.
          </p>
        </div>
      </div>
      
      {/* Cancel button */}
      <button className="mt-6 px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
        Cancel Matchmaking
      </button>
    </div>
  );
};