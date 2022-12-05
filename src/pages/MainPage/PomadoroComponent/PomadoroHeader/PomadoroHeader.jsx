import React, { useEffect } from "react";
import styles from "./PomadoroHeader.module.scss";
import { useSelector } from "react-redux";

export default function PomadoroHeader({ taskName }) {
  const tasks = useSelector((state) => state.timer.tasks);
  const currentTask = tasks.find((task) => task.inputValue === taskName);
  const currentPomador = currentTask.currentPomador;
  const isTouched = currentTask?.initialTouched;
  const isTimeoutCounting = currentTask?.timeoutCounting;
  const isPauseTimeout = currentTask?.timeoutPause;
  const timeOutNumber = currentTask?.currentTimeout;

  function setColorTimer() {
    let styleName = `${styles.pomadorHeader}`;
    if (isTouched && !isTimeoutCounting && !isPauseTimeout) {
      styleName += ` ${styles.pomadorHeaderRed}`;
    } else if (isTimeoutCounting || isPauseTimeout) {
      styleName += ` ${styles.pomadorHeaderGreen}`;
    }
    return styleName;
  }

  useEffect(() => setColorTimer, [isTimeoutCounting, isTouched]);

  return (
    <div className={setColorTimer()}>
      <span className={styles.taskName}>{taskName}</span>
      <span className={styles.taskNumber}>
        {isTimeoutCounting || isPauseTimeout
          ? `Перерыв ${timeOutNumber}`
          : `Помидор ${currentPomador}`}
      </span>
    </div>
  );
}
