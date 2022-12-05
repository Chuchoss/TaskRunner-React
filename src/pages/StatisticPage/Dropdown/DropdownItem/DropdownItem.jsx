import styles from "./DropdownItem.module.scss";
import { useDispatch } from "react-redux";
import { selectPeriod } from "../../../../toolkitRedux/toolkitSliceStatistic";

export default function DropdownItem({ text, open }) {
  const dispatch = useDispatch();
  const classes = `${styles.item} ${styles.active}`;

  return (
    <li
      onClick={() => dispatch(selectPeriod({ text }))}
      className={(open ? classes : styles.item) + ` menuItem`}
    >
      <span className={styles.text}>{text}</span>
    </li>
  );
}
