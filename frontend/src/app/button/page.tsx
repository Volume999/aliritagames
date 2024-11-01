"use client";

import { useEffect, useState } from "react";

type GameState = "idle" | "countdown" | "playing" | "finished";

export default function Button() {
  const GAME_DURATION = 15;
  const COUNTDOWN_DURATION = 3;
  const ENDING_DURATION = 10;
  const [clicks, setClicks] = useState(0);
  const [clickTimes, setClickTimes] = useState<number[]>([]);
  const [clickRate, setClickRate] = useState(0);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [gameScore, setGameScore] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_DURATION);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameFinishTime, setGameFinishTime] = useState<number>(0);

  const calculateClickRate = (times: number[]) => {
    if (times.length < 3) {
      return 0;
    }
    const minTime = Math.min(...times);
    const now = Date.now();
    const diffInSeconds = (now - minTime) / 1000;
    return times.length / diffInSeconds;
  };

  const handleClick = () => {
    setClicks((click) => click + 1);
    const now = Date.now();
    setClickTimes((prev) => {
      const times = [...prev, now];
      setClickRate(calculateClickRate(times));
      return times;
    });
  };
  const resetGame = () => {
    setClicks(0);
    setClickTimes([]);
    setClickRate(0);
  };
  const startGame = () => {
    setCountdown(COUNTDOWN_DURATION);
    setGameState("countdown");
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      setClickTimes((prev) => prev.filter((time) => time > now - 5000));
      setClickRate(calculateClickRate(clickTimes));
    }, 100);
    return () => clearInterval(intervalId);
  }, [clickTimes]);
  useEffect(() => {
    if (gameState != "countdown") {
      return;
    }
    if (countdown == 0) {
      resetGame();
      setGameState("playing");
      setGameStartTime(Date.now());
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, gameState]);
  useEffect(() => {
    if (gameState != "playing") {
      return;
    }
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor(Date.now() - gameStartTime) / 1000;
      if (elapsed >= GAME_DURATION) {
        setGameScore(clicks);
        setGameState("finished");
        setGameFinishTime(Date.now());
      }
    });
    return () => clearInterval(timerInterval);
  }, [gameState, clicks, gameStartTime]);
  useEffect(() => {
    if (gameState != "finished") {
      return;
    }
    const timerInterval = setInterval(() => {
      const elapsed = Math.floor(Date.now() - gameFinishTime) / 1000;
      if (elapsed >= ENDING_DURATION) {
        setGameScore(0);
        setGameState("idle");
        setGameStartTime(0);
        setGameFinishTime(0);
      }
    });
    return () => clearInterval(timerInterval);
  }, [gameState, gameFinishTime]);

  const getScoreColor = (clickRate: number) => {
    if (clickRate < 1) {
      return "text-white";
    }
    if (clickRate < 2) {
      return "text-green-300";
    }
    if (clickRate < 3) {
      return "text-green-500";
    }
    if (clickRate < 4) {
      return "text-yellow-300";
    }
    if (clickRate < 5) {
      return "text-yellow-500";
    }
    if (clickRate < 6) {
      return "text-orange-500";
    }
    return "text-red-500";
  };
  const getButtonText = (clickRate: number) => {
    if (clickRate < 1) {
      return "Smash me!";
    }
    if (clickRate < 2) {
      return "Feels so good!";
    }
    if (clickRate < 3) {
      return "I love it!";
    }
    if (clickRate < 4) {
      return "More! More!";
    }
    if (clickRate < 5) {
      return "Amazing!";
    }
    if (clickRate < 6) {
      return "Hit me harder!";
    }
    return "Just like that!";
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {gameState == "countdown" && (
        <div className="transform">
          <span className="text-4xl font-bold">
            Starting game in: {countdown}
          </span>
        </div>
      )}
      {gameState == "playing" && (
        <div className="transform">
          <span className="text-4xl font-bold">
            Time left:{" "}
            {((gameStartTime - Date.now()) / 1000 + GAME_DURATION).toPrecision(
              3,
            )}
            s
          </span>
        </div>
      )}
      {gameState == "finished" && (
        <div className="transform">
          <span className="text-4xl font-bold">
            Game over, Score: {gameScore}. Congratulations!
          </span>
        </div>
      )}
      <span
        className={`h-10 text-2xl sm:text-3xl mb-5 ${clickRate > 0 ? "animate-button-press" : ""} ${getScoreColor(clickRate)}`}
      >
        Score: {clicks}{" "}
      </span>
      <span
        className={`h-20 text-xl sm:text-3xl mb-1 ${getScoreColor(clickRate)}`}
      >
        Points per second: {clickRate.toPrecision(3)}{" "}
      </span>
      <button
        onClick={handleClick}
        className="h-80 w-80 rounded-lg mx-auto mb-12 transform transition-transform active:scale-90 hover:scale-105 bg-pink-500 hover:bg-pink-600 text-2xl text-white"
      >
        {" "}
        {getButtonText(clickRate)}
      </button>
      <button
        onClick={resetGame}
        className="h-10 w-80 rounded-lg mx-auto mb-5 transform transition-transform active:scale-90 hover:scale-105 bg-pink-400 hover:bg-pink-600 text-black"
      >
        Reset score
      </button>
      <button
        onClick={startGame}
        className="h-10 w-80 rounded-lg mx-auto transform transition-transform active:scale-90 hover:scale-105 bg-green-400 hover:bg-pink-600 text-black"
      >
        Start game
      </button>
    </div>
  );
}
