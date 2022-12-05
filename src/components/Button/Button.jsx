import React from "react";
import styles from "./Button.module.scss";

export default function Button({ text, handler, disabled = false, classProp }) {
  return (
    <button className={styles[classProp]} onClick={handler} disabled={disabled}>
      {text}
    </button>
  );
}
