import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  increaseCurrentPomador,
  removeTask,
} from "../../../../../toolkitRedux/toolkitSliceTimer";

export default function TimeoutCountingCompontnt(payload) {
  const dispatch = useDispatch();
  const {
    counting,
    setTimeoutLeftSeconds,
    timeoutLeftSeconds,
    setTimeoutCounting,
    taskName,
    setTimeLeftSeconds,
    initialTime,
    initialTimeOut,
    setCounting,
    timeoutCounting,
    currentPomador,
    pomadorInitial,
  } = payload;

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeoutCounting) {
        setTimeoutLeftSeconds((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
      }
    }, 1000);

    if (timeoutLeftSeconds === 0) {
      setTimeoutCounting(false);
      if (!timeoutCounting && currentPomador < pomadorInitial) {
        dispatch(increaseCurrentPomador({ taskName }));
        setTimeLeftSeconds(initialTime);
        setCounting(true);
      } else if (!counting && currentPomador >= pomadorInitial) {
        dispatch(removeTask({ taskName }));
        setTimeLeftSeconds(initialTime);
        setTimeoutLeftSeconds(initialTimeOut);
      }
    }

    return () => clearInterval(interval);
  }, [timeoutCounting, timeoutLeftSeconds]);

  return false;
}
