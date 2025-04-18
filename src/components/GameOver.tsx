import React from 'react';

interface Props {
  winner: string;
  selfId: string;
  onRestart: () => void;
}

export const GameOver: React.FC<Props> = ({ winner, selfId, onRestart }) => {
  const isWinner = winner === selfId;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-100 p-4">
      {/* Decorative elements */}
      <div className="fixed top-20 left-20 w-24 h-24 rounded-full bg-blue-200 opacity-30 animate-pulse hidden md:block"></div>
      <div className="fixed bottom-20 right-20 w-32 h-32 rounded-full bg-purple-200 opacity-30 animate-pulse hidden md:block"></div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-purple-100 relative z-10">
        <div className="text-center">
          {isWinner ? (
            <div className="animate-bounce inline-block p-4 rounded-full bg-yellow-100 mb-5">
              <span className="text-5xl">🏆</span>
            </div>
          ) : (
            <div className="inline-block p-4 rounded-full bg-blue-100 mb-5">
              <span className="text-5xl">🧠</span>
            </div>
          )}
          
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isWinner ? 'text-yellow-600' : 'text-blue-600'}`}>
            {isWinner ? 'You Win!' : 'You Lost!'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            {isWinner 
              ? 'Congratulations! Your knowledge has led you to victory.' 
              : 'Nice try! Keep learning and you\'ll win next time.'}
          </p>
          
          {/* Victory confetti or consolation animation */}
          {isWinner && (
            <div className="flex justify-center items-center space-x-2 my-6">
              <div className="w-2 h-12 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-16 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-20 bg-yellow-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 h-16 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-2 h-12 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Play Again button */}
      <button
        onClick={onRestart}
        className={`mt-8 px-8 py-3 rounded-xl font-semibold text-white shadow-lg transform transition-all duration-300 hover:scale-105 ${
          isWinner 
            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700' 
            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
        }`}
      >
        Play Again
      </button>
    </div>
  );
};