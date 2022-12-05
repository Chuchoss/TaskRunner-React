import React from "react";
import styles from "./SettingsButton.module.scss";

export default function SettingsButton({ pluse, handler }) {
  return pluse ? (
    <button
      onClick={() => handler()}
      className={`${styles.settingsButton} ${styles.pluse}`}
    >
      +
    </button>
  ) : (
    <button
      onClick={() => handler()}
      className={`${styles.settingsButton} ${styles.minuse}`}
    >
      -
    </button>
  );
}
