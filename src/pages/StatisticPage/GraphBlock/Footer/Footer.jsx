import Column from "../Column/Column";
import styles from "./Footer.module.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Footer({ week }) {
  const [defaultValue, setDefaultValue] = useState([]);
  const days = useSelector((state) => state.statistic.days);

  useEffect(() => {
    days.map((day) => {
      setDefaultValue((prev) => [...prev, day.weekDay]);
    });
  }, [days]);

  return (
    <div className={styles.footer}>
      {(week.days.length > 0 &&
        week.days.map((day) => (
          <Column
            text={day.weekDay}
            key={day.weekDay}
            timeOfDay={day.workTime}
          />
        ))) ||
        defaultValue.map((day, index) => <Column text={day} key={index} />)}
    </div>
  );
}
