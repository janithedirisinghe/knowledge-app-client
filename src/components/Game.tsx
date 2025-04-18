// src/components/Game.tsx
import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Lobby } from './Lobby';
import { Scoreboard } from './Scoreboard';
import { GameOver } from './GameOver';

interface Question {
  question: string;
  options: string[];
}

interface Player {
  id: string;
  score: number;
}

export const Game = () => {
  const socket = useSocket();
  const [selfId, setSelfId] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [status, setStatus] = useState<"lobby" | "playing" | "gameover">("lobby");
  const [question, setQuestion] = useState<Question | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [loadingQuestion, setLoadingQuestion] = useState<boolean>(false);

  useEffect(() => {
    if (!socket) return;

    const onConnect = () => {
      setSelfId(socket.id || "");
      socket.emit("join_game");
    };

    const onGameStart = (playerList: Player[]) => {
      setPlayers(playerList);
      setStatus("playing");
    };

    const onQuestion = (q: Question) => {
      setQuestion(q);
      setFeedback("");
      setLoadingQuestion(false);
    };

    const onScoreUpdate = (playerList: Player[]) => {
      setPlayers(playerList);
    };

    const onCorrect = () => {
      setFeedback("🎉 Correct!");
    };

    const onWrong = () => {
      setFeedback("❌ Wrong!");
    };

    const onGameOver = (winnerId: string) => {
      setWinner(winnerId);
      setStatus("gameover");
    };

    socket.on("connect", onConnect);
    socket.on("game_start", onGameStart);
    socket.on("new-question", onQuestion);
    socket.on("score_update", onScoreUpdate);
    socket.on("point_awarded", onCorrect);
    socket.on("wrong_answer", onWrong);
    socket.on("game_over", onGameOver);

    const questionTimeout = setTimeout(() => {
      if (status === "playing" && !question) {
        setLoadingQuestion(true);
      }
    }, 3000);

    return () => {
      socket.off("connect", onConnect);
      socket.off("game_start", onGameStart);
      socket.off("new-question", onQuestion);
      socket.off("score_update", onScoreUpdate);
      socket.off("point_awarded", onCorrect);
      socket.off("wrong_answer", onWrong);
      socket.off("game_over", onGameOver);
      clearTimeout(questionTimeout);
    };
  }, [socket, status, question]);

  const handleAnswer = (opt: string) => {
    socket.emit("submit_answer", opt);
  };

  const handleRestart = () => {
    socket.emit("restart_game");
    setStatus("lobby");
    setWinner(null);
    setQuestion(null);
    setFeedback("");
  };

  if (status === "lobby") return <Lobby />;
  if (status === "gameover" && winner)
    return <GameOver winner={winner} selfId={selfId} onRestart={handleRestart} />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-100 p-4">
      {/* Decorative elements */}
      <div className="fixed top-20 left-20 w-24 h-24 rounded-full bg-blue-200 opacity-30 animate-pulse hidden md:block"></div>
      <div className="fixed bottom-20 right-20 w-32 h-32 rounded-full bg-purple-200 opacity-30 animate-pulse hidden md:block"></div>
      
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-purple-100 relative z-10">
        <Scoreboard players={players} selfId={selfId} />
        
        <div className="mt-8">
          {question ? (
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-800 leading-tight">
                  {question.question}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    className="relative bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 
                    text-white py-4 px-5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg 
                    text-lg font-medium transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-300 focus:outline-none"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              
              {feedback && (
                <div className={`mt-4 p-4 rounded-lg text-center transition-all duration-500 transform ${
                  feedback.includes("Correct") ? 
                    "bg-green-50 border border-green-200 text-green-700" : 
                    "bg-red-50 border border-red-200 text-red-700"
                }`}>
                  <p className="text-xl font-bold">{feedback}</p>
                </div>
              )}
            </div>
          ) : loadingQuestion ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-6">
              <div className="flex justify-center items-center space-x-2">
                <div className="w-2 h-8 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-16 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-20 bg-purple-800 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-2 h-16 bg-purple-600 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <div className="w-2 h-8 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
              </div>
              <p className="text-lg text-purple-700 font-medium">Loading next question...</p>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="inline-block p-4 rounded-full bg-purple-100 mb-5">
                <span className="text-4xl">🧠</span>
              </div>
              <p className="text-xl text-purple-700 font-medium">Get ready for the next question!</p>
              <div className="mt-6 flex justify-center space-x-2">
                <span className="animate-bounce h-3 w-3 rounded-full bg-purple-400" style={{ animationDelay: '0s' }}></span>
                <span className="animate-bounce h-3 w-3 rounded-full bg-purple-500" style={{ animationDelay: '0.2s' }}></span>
                <span className="animate-bounce h-3 w-3 rounded-full bg-purple-600" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};