import Footer from "./Footer/Footer";
import styles from "./GraphBlock.module.scss";
import Row from "./Row/Row";
import { useSelector } from "react-redux";

export default function GraphBlock() {
  const initialPomadorTime = useSelector(
    (state) => state.timer.initialPomadorTime * 60
  );
  const activeItemDropdown = useSelector((state) => state.statistic.periods[0]);
  const weeks = useSelector((state) => state.statistic.weeks);
  const activeWeek = weeks.find((week) => week.period === activeItemDropdown);

  const getRowTimeText = (number) => {
    let minutes = Math.trunc(
      (initialPomadorTime * (number > 0 ? number : 1)) / 60
    );
    let hours = Math.trunc(minutes / 60);
    if (hours < 1) return `${minutes}мин`;
    minutes = minutes - hours * 60;

    return minutes - hours * 60 === 0 ? `${hours}ч` : `${hours}ч ${minutes}мин`;
  };

  return (
    <div className={styles.wrapper}>
      <Row text={getRowTimeText(4)} />
      <Row text={getRowTimeText(3)} />
      <Row text={getRowTimeText(2)} />
      <Row text={getRowTimeText(1)} />
      <Footer week={activeWeek} />
    </div>
  );
}
