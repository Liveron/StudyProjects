import { useEffect } from "react";

interface ITimerProps {
  onTick: () => void;
  secondsRemaining: number;
}

export default function Timer({ onTick, secondsRemaining }: ITimerProps) {
  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(id);
  }, [onTick]);

  return (
    <div className="timer">
      {Math.floor(secondsRemaining / 60)} : {secondsRemaining % 60}
    </div>
  );
}
