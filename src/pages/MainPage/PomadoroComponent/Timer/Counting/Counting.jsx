import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  increaseCurrentTimeout,
  removeTask,
} from "../../../../../toolkitRedux/toolkitSliceTimer";
import { pomadorDoneStatistic } from "../../../../../toolkitRedux/toolkitSliceStatistic";

export default function Counting(payload) {
  const dispatch = useDispatch();
  const {
    pomadorCreatedDate,
    counting,
    setTimeoutLeftSeconds,
    timeoutLeftSeconds,
    setTimeoutCounting,
    taskName,
    setTimeLeftSeconds,
    initialTime,
    initialTimeOut,
    timeLeftSeconds,
    currentTimeout,
    taskTimeouts,
    setCounting,
  } = payload;

  useEffect(() => {
    const interval = setInterval(() => {
      if (counting) {
        setTimeLeftSeconds((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
      }
    }, 1000);

    if (timeLeftSeconds === 0) {
      setCounting(false);
      if (!counting) {
        dispatch(
          pomadorDoneStatistic({ taskName, pomadorCreatedDate, initialTime })
        );
        if (currentTimeout <= taskTimeouts) {
          dispatch(increaseCurrentTimeout({ taskName }));
          setTimeoutLeftSeconds(initialTimeOut);
          setTimeoutCounting(true);
        } else if (timeoutLeftSeconds === 0 && currentTimeout >= taskTimeouts) {
          dispatch(removeTask({ taskName }));
          setTimeLeftSeconds(initialTime);
        }
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [counting, timeLeftSeconds]);
  return false;
}
