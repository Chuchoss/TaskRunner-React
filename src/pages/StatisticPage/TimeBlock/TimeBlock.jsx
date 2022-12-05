import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import plural from "plural-ru";
import styles from "./TimeBlock.module.scss";
import EmptyBlock from "../EmptyBlock/EmptyBlock";

export default function TimeBlock() {
  const todayNumber = moment().day();
  const activDay = useSelector((state) => state.statistic.activeDay);
  const days = useSelector((state) => state.statistic.days);
  const activDayStr = useSelector((state) => state.statistic.activDayStr);
  const today = days.find((el) => el.dayNumber === todayNumber).fullNameDay;
  const [currentDayName, setCurrentDayName] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(getTimeText(activDay.workTime));
  }, [activDay]);

  useEffect(() => {
    if (activDay.fullNameDay) {
      setCurrentDayName(activDay.fullNameDay);
    } else if (activDayStr) {
      setCurrentDayName(activDayStr);
    } else {
      setCurrentDayName(today);
    }
  }, [today, activDay, activDayStr]);

  const getCurrentTextHours = (hours) => {
    return plural(hours, "%d часа", "%d часов", "%d часов");
  };

  const getCurrentTexMinutes = (minutes) => {
    return plural(minutes, "%d минуты", "%d минут", "%d минут");
  };

  const getTimeText = (time) => {
    if (60 > time > 0) return "менее чем минуты";
    let minutes = Math.trunc(time / 60);
    let hours = Math.trunc(minutes / 60);
    if (hours < 1) return getCurrentTexMinutes(minutes);
    minutes = minutes - hours * 60;

    return minutes - hours * 60 === 0
      ? `${getCurrentTextHours(hours)}`
      : `${getCurrentTextHours(hours)} ${getCurrentTexMinutes(minutes)}`;
  };

  return (
    <EmptyBlock>
      <h3 className={styles.blockTitle}>{currentDayName}</h3>
      {activDay.workTime ? (
        <p className={styles.paragraph}>
          Вы работали над задачами в течение
          <span className={styles.time}> &#32;{currentTime}</span>
        </p>
      ) : (
        <p className={styles.paragraph}>Нет данных</p>
      )}
    </EmptyBlock>
    // <div className={styles.wrapper}>

    // </div>
  );
}
