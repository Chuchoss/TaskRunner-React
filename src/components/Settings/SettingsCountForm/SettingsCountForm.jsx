import React from "react";
import SettingsButton from "../SettingsButton/SettingsButton";
import styles from "./SettingsCountForm.module.scss";

export default function SettingsCountForm({
  value,
  placeholder,
  handlerIncrease,
  handlerDecrease,
}) {
  return (
    <div className={styles.pomadorsCountWrapper}>
      <SettingsButton handler={handlerDecrease} />
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          placeholder={placeholder}
          type='number'
          min='1'
        />
        <span className={styles.text}>{value ? value : "мин"}</span>
      </div>
      <SettingsButton handler={handlerIncrease} pluse />
    </div>
  );
}
