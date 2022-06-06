import styles from "./Modal.module.css";
import closeIcon from "../../../images/close.svg";

function Modal({ closeCallback, children }: any) {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <div className={styles.closeModalWrapper}>
          <img
            src={closeIcon}
            alt="close"
            onClick={() => closeCallback(false)}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
