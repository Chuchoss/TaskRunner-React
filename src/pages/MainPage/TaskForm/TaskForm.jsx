import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button/Button";
import getTimeFromMins from "../../../helpers/getTimeFromMines";
import {
  addPomadoro,
  increment,
} from "../../../toolkitRedux/toolkitSliceTimer";
import styles from "./TaskForm.module.scss";
import TaskListMemo from "./TaskList/TaskList";

export default function TaskForm() {
  const tasks = useSelector((state) => state.timer.tasks);
  const [inputValue, setInputValue] = useState("");
  const [valueError, setValueError] = useState("");
  const allMinutesPomadoras = useSelector(
    (state) => state.timer.allPomadorasTimeMinutes
  );
  const dispatch = useDispatch();
  let pomadorInitial = 1;

  const getAllPomadorsTime = useMemo(() => {
    const time = getTimeFromMins(allMinutesPomadoras);
    const minutes = time.split(":").at(-1);
    const hours = time.charAt(0);
    if (hours > 0) {
      return `${hours} час. ${minutes} мин.`;
    } else {
      return `${minutes} мин.`;
    }
  }, [allMinutesPomadoras]);

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  function validateValue() {
    if (tasks.find((el) => el.inputValue === inputValue))
      return "Такая задача уже есть";
    if (inputValue.length <= 3) return "Введите больше 3-х символов";
    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();
    setValueError(validateValue());
    const isFormValid = !validateValue();
    if (!isFormValid) return;
    dispatch(increment());
    dispatch(addPomadoro({ inputValue, pomadorInitial }));
    setInputValue("");
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          onChange={handleChange}
          value={inputValue}
          aria-invalid={valueError ? "true" : undefined}
          placeholder='Название задачи'
          type='text'
        />

        {valueError && <div className={styles.errorText}>{valueError}</div>}

        <Button classProp={`fielldButton`} type='submit' text={"Добавить"} />
      </form>
      <TaskListMemo pomadorInitial={pomadorInitial} />
      <div className={styles.time}>
        {tasks.length > 0 && getAllPomadorsTime}
      </div>
    </>
  );
}
