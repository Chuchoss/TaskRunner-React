import React from "react";
import styles from "./MainPage.module.scss";
import { v4 as uuid } from "uuid";
import InstructionItem from "./InstructionItem/InstructionItem";
import TaskForm from "./TaskForm/TaskForm";
import PomadoroComponent from "./PomadoroComponent/PomadoroComponent";

export default function MainPage() {
  const instructions = [
    "Выберите категорию и напишите название текущей задачи",
    "Запустите таймер («помидор»)",
    "Работайте пока «помидор» не прозвонит",
    "Сделайте короткий перерыв (3-5 минут)",
    "Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).",
  ];

  return (
    <div className={styles.mainPage}>
      <div className={styles.leftSide}>
        <h2 className={styles.instructionTitle}>
          Ура! Теперь можно начать работать:
        </h2>
        <ul className={styles.instructionList}>
          {instructions.map((item) => (
            <InstructionItem key={uuid()} Text={item} />
          ))}
        </ul>
        <TaskForm />
      </div>
      <PomadoroComponent />
    </div>
  );
}
