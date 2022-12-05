import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalDelete.module.scss";

export default function ModalDelete({
  isVisible = false,
  title,
  content,
  footer,
  onClose,
}) {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => document.removeEventListener("keydown", keydownHandler);
  });

  return ReactDOM.createPortal(
    !isVisible ? null : (
      <div className={styles.modal} onClick={onClose}>
        <div
          className={styles.modalDialog}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{title}</h3>
            <button className={styles.modalClose} onClick={onClose}>
              &times;
            </button>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.modalContent}>{content}</div>
          </div>
          {footer && <div className={styles.modalFooter}>{footer}</div>}
        </div>
      </div>
    ),
    document.querySelector("#deleteModal")
  );
}
