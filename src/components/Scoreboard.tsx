import React from 'react';

interface ScoreboardProps {
  players: { id: string; score: number }[];
  selfId: string;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ players, selfId }) => {
  // Sort players by score (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">Scoreboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedPlayers.map((player, index) => {
          const isSelf = player.id === selfId;
          const isLeading = index === 0 && players.length > 1;
          
          return (
            <div 
              key={player.id}
              className={`
                relative overflow-hidden rounded-xl shadow-md transition-all duration-300
                ${isSelf ? 'bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300' : 'bg-white border border-gray-200'}
                ${isLeading ? 'md:col-span-2 animate-pulse' : ''}
                transform hover:scale-105 hover:shadow-lg
              `}
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                      ${isSelf ? 'bg-purple-600' : 'bg-blue-500'}
                    `}>
                      {index + 1}
                    </div>
                    <span className="font-bold text-lg text-gray-800">
                      {isSelf ? 'You' : 'Opponent'}
                      {isLeading && <span className="ml-2 text-yellow-500">👑</span>}
                    </span>
                  </div>
                  
                  <div className="text-3xl font-extrabold text-gray-700">
                    {player.score}
                    <span className="text-sm ml-1 text-gray-400">pts</span>
                  </div>
                </div>
                
                {/* Score bar visualization */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${isSelf ? 'bg-purple-600' : 'bg-blue-500'}`} 
                    style={{ width: `${Math.min(100, (player.score / 10) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Decorative elements */}
              {isSelf && (
                <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-purple-200 opacity-20"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};