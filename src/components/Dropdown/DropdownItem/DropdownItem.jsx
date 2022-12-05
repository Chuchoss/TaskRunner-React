import React from "react";
import styles from "./DropdownItem.module.scss";

export default function DropdownItem({ text, icon, disabled, handler }) {
  return (
    <li className={styles.dropdownItem}>
      <button
        className={styles.dropdownButton}
        disabled={disabled}
        onClick={handler}
      >
        {icon}
        {text}
      </button>
    </li>
  );
}
