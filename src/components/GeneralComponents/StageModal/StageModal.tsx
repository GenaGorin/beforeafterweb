import { IStage } from "../../../interfaces/stage";
import Modal from "../Modal/Modal";
import styles from "./StageModal.module.css";
import imagePlaceholder from "../../../images/photoplaceholder.jpg";

type TStageModal = {
  stage: IStage;
  closeCallback: any;
};

function StageModal({ stage, closeCallback }: TStageModal) {
  return (
    <Modal closeCallback={closeCallback}>
      <div className={styles.stageWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={stage.image_url ? stage.image_url : imagePlaceholder}
            alt=""
          />
        </div>
      </div>
      <div>
        <div>{stage.date}</div>
        <div>{stage.description}</div>
      </div>
    </Modal>
  );
}
export default StageModal;
