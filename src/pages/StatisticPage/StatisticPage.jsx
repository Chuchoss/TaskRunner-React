import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import GraphBlock from "./GraphBlock/GraphBlock";
import PomadorsBlock from "./PomadorsBlock/PomadorsBlock";
import styles from "./StatisticPage.module.scss";
import StatisticsBlock from "./StatisticsBlock/StatisticsBlock";
import AlarmClock from "../../icons/AlarmClock";
import AlarmClockSecond from "../../icons/AlarmClockSecond";
import AlarmClockThird from "../../icons/AlarmClockThird";
import TimeBlock from "./TimeBlock/TimeBlock";
import { useSelector } from "react-redux";

export default function StatisticPage() {
  const activeDay = useSelector((state) => state.statistic.activeDay);
  const [focus, setFocus] = useState("0%");
  const [pauses, setPauses] = useState("0м");
  const [stoppings, setStoppings] = useState("0");
  const [isActive, setIsActive] = useState(false);

  const getTimeText = (time) => {
    if (60 > time > 0) return `${time}сек`;
    let minutes = Math.trunc(time / 60);
    let hours = Math.trunc(minutes / 60);
    if (hours < 1) return `${minutes}м`;
    minutes = minutes - hours * 60;

    return minutes - hours * 60 === 0 ? `${hours}ч` : `${hours}ч ${minutes}м`;
  };

  useEffect(() => {
    if (activeDay.workTime > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (activeDay.focusPercent > 0) {
      setFocus(activeDay.focusPercent + "%");
    } else {
      setFocus("0%");
    }
    if (activeDay.pauseTime > 0) {
      setPauses(getTimeText(activeDay.pauseTime));
    } else {
      setPauses("0м");
    }

    if (activeDay.pauseCount > 0) {
      setStoppings(String(activeDay.pauseCount));
    } else {
      setStoppings("0");
    }
  }, [activeDay]);

  return (
    <>
      <div className={styles.topContent}>
        <h2 className={styles.title}>Ваша активность</h2>
        <Dropdown />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftBlocks}>
          <TimeBlock />
          <PomadorsBlock />
        </div>
        <GraphBlock />
      </div>
      <div className={styles.bottomBlocks}>
        <StatisticsBlock
          color={isActive ? "orange" : "defaultColor"}
          title='Фокус'
          text={focus}
          svg={<AlarmClock color={isActive} />}
        />
        <StatisticsBlock
          color={isActive ? "purple" : "defaultColor"}
          title='Время на паузе'
          text={pauses}
          svg={<AlarmClockSecond color={isActive} />}
        />
        <StatisticsBlock
          color={isActive ? "blue" : "defaultColor"}
          title='Остановки'
          text={stoppings}
          svg={<AlarmClockThird color={isActive} />}
        />
      </div>
    </>
  );
}
