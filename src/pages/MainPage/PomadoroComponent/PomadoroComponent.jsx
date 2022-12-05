import React from "react";
import { useSelector } from "react-redux";
import PomadoroHeader from "./PomadoroHeader/PomadoroHeader";
import styles from "./PomadoroComponent.module.scss";
import Timer from "./Timer/Timer";

export default function PomadoroComponent() {
  const tasks = useSelector((state) => state.timer.tasks);
  const taskName = tasks[0]?.inputValue;

  return (
    tasks.length > 0 && (
      <div id={"pomador"} className={styles.pomadorComp}>
        <PomadoroHeader taskName={taskName} />
        <Timer taskName={taskName} />
      </div>
    )
  );
}
