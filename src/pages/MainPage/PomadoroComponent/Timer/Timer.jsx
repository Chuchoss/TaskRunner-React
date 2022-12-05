import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPadTime } from "../../../../helpers/getPadTime";
import { ADD_TIME } from "../../../../constants/api";
import { defineStateOfTimer } from "../../../../helpers/defineStateOfTimer";
import Button from "../../../../components/Button/Button";
import Counting from "./Counting/Counting";
import PauseCounting from "./PauseCounting/PauseCounting";
import TimeoutCountingCompontnt from "./TimeoutCountingCompontnt/TimeoutCountingCompontnt";
import switchClassProp from "../../../../helpers/switchTimerClass";
import moment from "moment";
import {
  increasePauseCount,
  pomadorDoneStatistic,
  checkActualWeek,
  increasePauseTime,
} from "../../../../toolkitRedux/toolkitSliceStatistic";
import {
  doneTask,
  changeState,
  addTime,
} from "../../../../toolkitRedux/toolkitSliceTimer";
import styles from "./Timer.module.scss";
import Time from "./Time/Time";

export default function Timer({ taskName }) {
  const dispatch = useDispatch();
  const timeOuts = useSelector((state) => state.timeouts);
  const toolkit = useSelector((state) => state.timer);
  const { initialBigTimeoutAfter, initialBigTimeoutTime, initialTimeoutTime } =
    timeOuts;
  const { allDonePomadors, tasks, initialPomadorTime } = toolkit;
  const task = tasks.find((task) => task.inputValue === taskName);
  const {
    taskNumber,
    currentPomador,
    pomadorInitial,
    currentTimeout,
    taskTimeouts,
  } = task;
  const initialTime = initialPomadorTime * 60;
  const initialTimeOut =
    (allDonePomadors + 1) % initialBigTimeoutAfter === 0
      ? initialBigTimeoutTime * 60
      : initialTimeoutTime * 60;

  const [initialTouched, setInitialTouched] = useState(task.initialTouched);
  const [counting, setCounting] = useState(task.timeoutCounting);
  const [timeoutCounting, setTimeoutCounting] = useState(task.timeoutCounting);
  const [timeoutPause, setTimeoutPause] = useState(task.timeoutPause);
  const [pauseCounting, setPauseCounting] = useState(task.pauseCounting); //Состояние паузы
  const [pauseCount, setPauseCount] = useState(task.pauseCount || 0); //Количество остановок

  const createdWeek = moment().week();
  const createdDay = moment().day();
  const pomadorCreatedDate = {
    createdWeek,
    createdDay,
  };

  const [classForMinutesOne, setClassForMinutesOne] = useState("");
  const [classForMinutesTwo, setClassForMinutesTwo] = useState("");
  const [classForSecondsOne, setClassForSecondsOne] = useState("");
  const [classForSecondsTwo, setClassForSecondsTwo] = useState("");

  const [classForTimeoutSecondsTwo, setClassForTimeoutSecondsTwo] =
    useState("");
  const [classForTimeoutSecondsOne, setClassForTimeoutSecondsOne] =
    useState("");
  const [classForTimeoutMinutesOne, setClassForTimeoutMinutesOne] =
    useState("");
  const [classForTimeoutMinutesTwo, setClassForTimeoutMinutesTwo] =
    useState("");

  const [addTimeTrigger, setAddTimeTrigger] = useState(false);
  const [pauseLeftSeconds, setPauseLeftSeconds] = useState(
    task.pauseLeftSeconds || 0
  ); //Количество секунд на паузе
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(
    task.timeLeftSeconds || initialTime
  );
  const [timeoutLeftSeconds, setTimeoutLeftSeconds] = useState(
    task.timeoutLeftSeconds || initialTimeOut
  );
  const minutes = getPadTime(Math.floor(timeLeftSeconds / 60));
  const seconds = getPadTime(timeLeftSeconds - minutes * 60);
  const timeoutMinutes = getPadTime(Math.floor(timeoutLeftSeconds / 60));
  const timeoutSeconds = getPadTime(timeoutLeftSeconds - timeoutMinutes * 60);

  const setTimeoutNumbersClasses = () => {
    switchClassProp(timeoutMinutes[0], setClassForTimeoutMinutesOne);
    switchClassProp(timeoutMinutes[1], setClassForTimeoutMinutesTwo);
    switchClassProp(timeoutSeconds[0], setClassForTimeoutSecondsOne);
    switchClassProp(timeoutSeconds[1], setClassForTimeoutSecondsTwo);
  };

  useEffect(() => {
    if (counting || timeoutCounting) return;
    setTimeLeftSeconds(task.timeLeftSeconds);
  }, [tasks]);

  const setNumbersClasses = () => {
    switchClassProp(minutes[0], setClassForMinutesOne);
    switchClassProp(minutes[1], setClassForMinutesTwo);
    switchClassProp(seconds[0], setClassForSecondsOne);
    switchClassProp(seconds[1], setClassForSecondsTwo);
  };

  useEffect(() => {
    setNumbersClasses();
    setTimeoutNumbersClasses();
  }, [
    counting,
    timeoutCounting,
    timeoutLeftSeconds,
    timeLeftSeconds,
    addTimeTrigger,
  ]);

  const setColorTimer = () => {
    let styleName = `${styles.time}`;
    if (initialTouched && !timeoutCounting) {
      styleName += ` ${styles.timeRed}`;
    } else if (timeoutCounting || timeoutPause) {
      styleName += ` ${styles.timeGreen}`;
    }
    return styleName + ` ${styles["mrgn-btm-30"]}`;
  };

  const handleAddTime = () => {
    const newValueLeft = timeLeftSeconds + ADD_TIME;
    const newValueTimeoutleft = timeoutLeftSeconds + ADD_TIME;
    setTimeoutLeftSeconds((prevValue) => prevValue + ADD_TIME);
    setTimeLeftSeconds((prevValue) => prevValue + ADD_TIME);
    dispatch(addTime({ taskName, newValueLeft, newValueTimeoutleft }));
    setAddTimeTrigger((prev) => !prev);
  };

  const handleStart = () => {
    dispatch(checkActualWeek({ pomadorCreatedDate }));
    setInitialTouched(true);
    setCounting(true);
    setInitialTouched(true);
    dispatch(
      changeState({
        taskName,
        initialTouched,
        timeoutCounting,
        timeoutPause,
        pauseCounting,
        pauseCount,
        pauseLeftSeconds,
        timeLeftSeconds,
        timeoutLeftSeconds,
        counting,
      })
    );
  };

  const countingPayload = {
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
    timeoutCounting,
    pauseCounting,
    pauseLeftSeconds,
    currentPomador,
    pomadorInitial,
    setPauseLeftSeconds,
  };

  Counting(countingPayload);
  TimeoutCountingCompontnt(countingPayload);
  PauseCounting(countingPayload);

  const handlePause = () => {
    setCounting(false);
    setPauseCounting(true);
    dispatch(increasePauseCount({ pomadorCreatedDate }));
    setPauseCount((prevValue) => prevValue + 1);
  };

  const handleStop = () => {
    setCounting(false);
    setInitialTouched(false);
    setTimeLeftSeconds(initialTime);
  };

  const handleContinue = () => {
    dispatch(increasePauseTime({ pomadorCreatedDate, pauseLeftSeconds }));
    setPauseCounting(false);
    setCounting(true);
  };

  const handleDone = () => {
    setInitialTouched(false);
    setTimeoutCounting(false);
    setPauseCounting(false);
    setTimeLeftSeconds(initialTime);
    setTimeoutLeftSeconds(initialTimeOut);
    dispatch(
      pomadorDoneStatistic({
        pomadorCreatedDate,
        initialTime,
        timeLeftSeconds,
        pauseLeftSeconds,
      })
    );
    dispatch(doneTask({ taskName }));
  };

  const handlePauseTimeout = () => {
    setTimeoutCounting(false);
    setTimeoutPause(true);
    setPauseCounting(true);
    dispatch(increasePauseCount({ pomadorCreatedDate }));
    setPauseCount((prevValue) => prevValue + 1);
  };

  const handleContinueTimeout = () => {
    dispatch(increasePauseTime({ pomadorCreatedDate, pauseLeftSeconds }));
    setPauseCounting(false);
    setTimeoutPause(false);
    setTimeoutCounting(true);
  };

  const handleSkipTimeout = () => {
    setTimeoutCounting(false);
    setPauseCounting(false);
    setTimeoutPause(false);
    setTimeoutLeftSeconds(0);
  };

  useEffect(() => {
    dispatch(
      changeState({
        taskName,
        initialTouched,
        timeoutCounting,
        timeoutPause,
        pauseCounting,
        pauseCount,
        pauseLeftSeconds,
        timeLeftSeconds,
        timeoutLeftSeconds,
        counting,
      })
    );
  }, [
    initialTouched,
    timeoutCounting,
    timeoutPause,
    pauseCounting,
    pauseCount,
  ]);

  const buttonStyles = defineStateOfTimer(
    handleStart,
    handleStop,
    initialTouched,
    handlePause,
    counting,
    pauseCounting,
    timeoutPause,
    handleContinue,
    handleDone,
    timeoutCounting,
    handlePauseTimeout,
    handleContinueTimeout,
    handleSkipTimeout
  );
  const buttonFirstButtonStyles = buttonStyles.firstButtonStyles;
  const buttonSecondButtonStyles = buttonStyles.secondButtonStyles;

  const timeoutPayload = {
    secondsOne: classForTimeoutSecondsOne,
    secondsTwo: classForTimeoutSecondsTwo,
    minutesOne: classForTimeoutMinutesOne,
    minutesTwo: classForTimeoutMinutesTwo,
  };

  const timePayload = {
    secondsOne: classForSecondsOne,
    secondsTwo: classForSecondsTwo,
    minutesOne: classForMinutesOne,
    minutesTwo: classForMinutesTwo,
  };

  return (
    <div className={styles.timerWrapper}>
      <div className={setColorTimer()}>
        {((timeoutCounting || timeoutPause) && (
          <Time payload={timeoutPayload} />
        )) || <Time payload={timePayload} />}
        <button className={styles.btnPlus} onClick={handleAddTime}>
          +
        </button>
      </div>

      <div className={styles.subtitleTask}>
        <span className={styles.taskNumber}>Задача {taskNumber} -</span>
        <span className={styles.taskName}>{taskName}</span>
      </div>

      <div className={styles.buttonsWrapper}>
        {
          <>
            <Button
              classProp={buttonFirstButtonStyles.classProp}
              handler={buttonFirstButtonStyles.handler}
              text={buttonFirstButtonStyles.text}
            />

            <Button
              classProp={buttonSecondButtonStyles.classProp}
              handler={buttonSecondButtonStyles.handler}
              disabled={buttonSecondButtonStyles.disabled}
              text={buttonSecondButtonStyles.text}
            />
          </>
        }
      </div>
    </div>
  );
}
