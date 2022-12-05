import React from "react";
import styles from "./SettingsToggle.module.scss";

export default function SettingsToggle({ handler, checked }) {
  return (
    <div className={`${styles.button} ${styles.r}`} id={["button-1"]}>
      <input
        className={styles.checkbox}
        checked={checked}
        onChange={() => handler()}
        type='checkbox'
      />
      <div className={styles.knobs}></div>
      <div className={styles.layer}></div>
    </div>
  );
}
