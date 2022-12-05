import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Column.module.scss";
import { setActiveDay } from "../../../../toolkitRedux/toolkitSliceStatistic";

export default function Column({ text, timeOfDay }) {
  const initialPomadorTime = useSelector(
    (state) => state.timer.initialPomadorTime * 60
  );
  const activeDay = useSelector((state) => state.statistic.activeDay).weekDay;
  const ref = useRef(null);
  const dispatch = useDispatch();

  const handlerClick = () => {
    document.querySelectorAll(`[data-text]`).forEach((el) => {
      el.classList.remove(`${styles.active}`);
    });
    ref.current.classList.add(`${styles.active}`);
    dispatch(setActiveDay({ text }));
  };

  useEffect(() => {
    const rowHeight = document
      .querySelector(".row")
      .getBoundingClientRect().height;

    const calcColumnHeight = () => {
      return Math.ceil((timeOfDay / initialPomadorTime) * rowHeight);
    };
    ref.current.style.maxHeight = rowHeight * 5 + "px";
    ref.current.style.height =
      timeOfDay > 5 ? calcColumnHeight() + "px" : "5px";

    if (activeDay === text) ref.current.classList.add(`${styles.active}`);
  }, [ref, timeOfDay]);

  return (
    <div
      onClick={handlerClick}
      ref={ref}
      data-text={text}
      className={`${styles.column} 
      ${timeOfDay && styles.notActive}`}
    ></div>
  );
}
