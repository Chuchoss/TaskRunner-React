import DropdownItem from "./DropdownItem/DropdownItem";
import styles from "./Dropdown.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const items = useSelector((state) => state.statistic.periods);

  const showAnimation = (el) => {
    el.style.display = "block";
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 100);
  };
  const hideAnimation = (el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(-30px)";
    setTimeout(() => {
      el.style.display = "none";
    }, 300);
  };

  const toggleMenu = (setClose) => {
    const itemsArray = Array.from(document.querySelectorAll(".menuItem"));
    for (let i = 1; i < itemsArray.length; i++) {
      isOpen || setClose
        ? hideAnimation(itemsArray[i])
        : showAnimation(itemsArray[i]);
    }
    setClose ? setIsOpen(false) : setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdownWrapper}>
      <OutsideClickHandler
        onOutsideClick={() => {
          toggleMenu(true);
        }}
      >
        <ul onClick={() => toggleMenu()} className={styles.dropdownList}>
          {items.map((item, index) => (
            <DropdownItem key={index} open={isOpen} text={item} />
          ))}
        </ul>
      </OutsideClickHandler>
    </div>
  );
}
