import React from "react";
import { useState } from "react";
import ModalDelete from "../../../ModalDelete/ModalDelete";
import styles from "./SettingsButtonRemove.module.scss";

export default function SettingsButtonRemove() {
  const [isModal, setIsModal] = useState(false);
  const removeData = () => {
    localStorage.removeItem("persist:root");
    window.location.reload();
  };
  return (
    <>
      <button
        onClick={() => setIsModal(!isModal)}
        className={styles.removeButton}
      >
        Обнулить
      </button>
      <ModalDelete
        isVisible={isModal}
        title='Удалить данные?'
        content={
          <div>
            <p className={styles.removeText}>
              После подтверждения будут удалены все выполненные и
              запланированные задачи, а также отчеты и статистка.
            </p>
            <button
              onClick={() => removeData()}
              className='removeBtn'
              autoFocus={true}
            >
              Удалить
            </button>
          </div>
        }
        footer={
          <button onClick={() => setIsModal(false)} className='canclBtn'>
            Отменить
          </button>
        }
        onClose={() => setIsModal(false)}
      />
    </>
  );
}
