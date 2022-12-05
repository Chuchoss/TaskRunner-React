import React from "react";
import DropdownAdd from "../../../icons/DropdownAdd";
import DropdownDecrease from "../../../icons/DropdownDecrease";
import DropdownEdit from "../../../icons/DropdownEdit";
import DropdownRemove from "../../../icons/DropdownRemove";
import DropdownItem from "../DropdownItem/DropdownItem";
import styles from "./DropdownList.module.scss";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../../toolkitRedux/toolkitSliceTimer";

export default function DropdownList(payload) {
  const { disabled, taskName, pomadorInitial, setModal, setEdit } = payload;
  const dispatch = useDispatch();
  const dropdownItmes = [
    {
      text: "Увеличить",
      icon: <DropdownAdd />,
      disabled: false,
      handler: () => dispatch(increment({ taskName, pomadorInitial })),
    },
    {
      text: "Уменьшить",
      icon: <DropdownDecrease />,
      disabled: disabled,
      handler: () => dispatch(decrement({ taskName, pomadorInitial })),
    },
    {
      text: "Редактировать",
      icon: <DropdownEdit />,
      disabled: false,
      handler: () => setEdit(true),
    },
    {
      text: "Удалить",
      icon: <DropdownRemove />,
      disabled: false,
      handler: () => setModal(true),
    },
  ];

  return (
    <ul className={styles.list}>
      {dropdownItmes.map((item) => (
        <DropdownItem
          key={item.text}
          text={item.text}
          icon={item.icon}
          disabled={item.disabled}
          handler={item.handler}
        />
      ))}
    </ul>
  );
}
