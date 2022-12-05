import React, { useEffect } from "react";

export default function PauseCounting(payload) {
  const { pauseCounting, pauseLeftSeconds, setPauseLeftSeconds } = payload;
  useEffect(() => {
    const interval = setInterval(() => {
      pauseCounting && setPauseLeftSeconds((timeLeft) => timeLeft + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [pauseCounting, pauseLeftSeconds]);

  return false;
}
