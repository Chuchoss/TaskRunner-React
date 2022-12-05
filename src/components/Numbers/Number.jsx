import React from "react";
import styles from "./Number.module.scss";

export default function Number({ styleProp }) {
  return styleProp === "dots" ? (
    <div className={styles[`${styleProp}`] + " " + `${styles.dots}`}></div>
  ) : (
    <div className={styles[`${styleProp}`] + " " + `${styles.number}`}>
      <span className={`${styles.d1}`}></span>
      <span className={`${styles.d2}`}></span>
      <span className={`${styles.d3}`}></span>
      <span className={`${styles.d4}`}></span>
      <span className={`${styles.d5}`}></span>
      <span className={`${styles.d6}`}></span>
      <span className={`${styles.d7}`}></span>
    </div>
  );
}
