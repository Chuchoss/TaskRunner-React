import styles from "./Row.module.scss";

export default function Row({ text }) {
  return (
    <div className={`${styles.row} row`}>
      <hr className={styles.hr} />
      <span className={styles.time}>{text}</span>
    </div>
  );
}
