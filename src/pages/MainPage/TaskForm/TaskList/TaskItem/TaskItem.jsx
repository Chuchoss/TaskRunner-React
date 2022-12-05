import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "../../../../../components/ModalDelete/ModalDelete";
import DropdownList from "../../../../../components/Dropdown/DropdownList/DropdownList";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import styles from "./TaskItem.module.scss";
import {
  removePomadoro,
  editNamePomadoro,
  setDrageItem,
  dropItem,
} from "../../../../../toolkitRedux/toolkitSliceTimer";

export default function TaskItem({ taskName, pomadorInitial, task }) {
  const [disabled, setDisabled] = useState(true);
  const [isModal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editState, setInputState] = useState("");
  const tasks = useSelector((state) => state.timer.tasks);
  const dispatch = useDispatch();

  const isCounting = (task) => {
    if (
      tasks[0].counting ||
      tasks[0].timeoutCounting ||
      task.counting ||
      task.timeoutCounting
    ) {
      return false;
    } else {
      return true;
    }
  };

  const dragStartHandler = (e, currentTask) => {
    if (!isCounting(task)) return;
    e.target.classList.add(styles.drag);
    dispatch(setDrageItem({ currentTask }));
  };

  const dragEndHandler = (e) => {
    if (!isCounting(task)) return;
    e.target.classList.remove(styles.drag);
  };

  const dragOverHandler = (e) => {
    if (!isCounting(task)) return;
    e.preventDefault();
    e.target.classList.add(styles.drag);
  };

  const dropHandler = (e, currentTask) => {
    if (!isCounting(task)) return;
    e.preventDefault();
    e.target.classList.remove(styles.drag);
    dispatch(dropItem({ currentTask }));
  };

  const pomadorCount = useMemo(() => {
    const valueInitial = tasks.find(
      (el) => el.inputValue === taskName
    ).pomadorInitial;
    const valueCurrent = tasks.find(
      (el) => el.inputValue === taskName
    ).currentPomador;
    const value = valueInitial - valueCurrent + 1;

    if (value > 1) setDisabled(false);
    return value;
  }, [tasks, taskName]);

  const editElement = () => {
    editState.length > 3 &&
      tasks.every((el) => el.inputValue !== editState) &&
      dispatch(editNamePomadoro({ editState, taskName }));
    setEdit(false);
  };
  const deleteElement = () => {
    dispatch(removePomadoro({ taskName, pomadorInitial }));
    setModal(false);
  };
  const keydownHandler = (e) => {
    if (e.keyCode === 13) editElement();
  };
  return (
    <>
      <li
        onDragStart={(e) => dragStartHandler(e, task)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, task)}
        draggable={isCounting(task)}
        className={styles.item}
      >
        <span className={styles.taskNumber}>{pomadorCount}</span>
        {!edit && <span className={styles.taskName}>{taskName}</span>}
        {edit && (
          <input
            type='text'
            autoFocus={true}
            onKeyDown={keydownHandler}
            onBlur={editElement}
            onChange={(e) => setInputState(e.target.value)}
            className={styles.editInput}
            placeholder='Новое название...'
          ></input>
        )}

        <Dropdown>
          <DropdownList
            pomadorInitial={pomadorInitial}
            taskName={taskName}
            setModal={setModal}
            setEdit={setEdit}
            disabled={disabled}
          />
        </Dropdown>
      </li>

      <ModalDelete
        isVisible={isModal}
        title='Удалить задачу?'
        content={
          <button
            onClick={() => deleteElement()}
            className='removeBtn'
            autoFocus={true}
          >
            Удалить
          </button>
        }
        footer={
          <button onClick={() => setModal(false)} className='canclBtn'>
            Отменить
          </button>
        }
        onClose={() => setModal(false)}
      />
    </>
  );
}
