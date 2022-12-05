import React from "react";
import styles from "./TaskList.module.scss";
import TaskItem from "./TaskItem/TaskItem";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
export function TaskList({ pomadorInitial }) {
  const tasks = useSelector((state) => state.timer.tasks);

  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskItem
          key={uuid()}
          pomadorInitial={pomadorInitial}
          taskName={task.inputValue}
          task={task}
        />
      ))}
    </ul>
  );
}

const TaskListMemo = React.memo(TaskList, (prev, next) => {
  return prev.tasks === next.tasks;
});

export default TaskListMemo;
