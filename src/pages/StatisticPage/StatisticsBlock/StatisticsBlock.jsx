import styles from "./StatisticsBlock.module.scss";

export default function StatisticsBlock({ color, title, text, svg }) {
  return (
    <div
      className={`${styles.wrapper} ${
        color ? styles[color] : styles.defaultColor
      } `}
    >
      <div className={styles.leftContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
      {svg}
    </div>
  );
}
