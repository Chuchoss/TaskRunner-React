import styles from "./EmptyBlock.module.scss";

export default function EmptyBlock({ children, height, center }) {
  return (
    <div
      style={height && { maxHeight: height }}
      className={`${styles.block} ${center && styles.center}`}
    >
      {children}
    </div>
  );
}
