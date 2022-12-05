import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Dots from "../../icons/Dots";
import styles from "./Dropdown.module.scss";

export default function Dropdown({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsDropdownOpen(false);
      }}
    >
      <div className={styles.container}>
        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <button className={styles.button}>
            <Dots />
          </button>
        </div>
        {isDropdownOpen && (
          <div className={styles.listContainer}>
            <div
              className={styles.list}
              onClick={() => setIsDropdownOpen(false)}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}
