import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BigTomato from "../../../icons/BigTomato";
import EmptyBlock from "../EmptyBlock/EmptyBlock";
import plural from "plural-ru";
import styles from "./PomadorsBlock.module.scss";
import SmallTomato from "../../../icons/SmallTomato";

export default function PomadorsBlock() {
  const activDay = useSelector((state) => state.statistic.activeDay);
  const [valueOfDay, setValueOfDay] = useState({});
  const [pomidorsText, setPomidorsText] = useState("");

  useEffect(() => {
    setValueOfDay(activDay);
  }, [activDay]);

  useEffect(() => {
    setPomidorsText(
      plural(
        valueOfDay.donePomadors,
        "%d помидор",
        "%d помидора",
        "%d помидоров"
      )
    );
  }, [valueOfDay]);

  return (
    <EmptyBlock height='179px' center>
      {valueOfDay.donePomadors ? (
        <>
          <div className={styles.tomatoWrapper}>
            <SmallTomato />
            <span> x {valueOfDay.donePomadors}</span>
          </div>
          <div className={styles.footer}> {pomidorsText}</div>
        </>
      ) : (
        <BigTomato />
      )}
    </EmptyBlock>
  );
}
