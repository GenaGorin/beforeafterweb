import { useState } from "react";
import { IStage } from "../../../interfaces/stage";
import StageModal from "../../GeneralComponents/StageModal/StageModal";
import styles from "../SingleGoal.module.css";
import imagePlaceholder from "../../../images/photoplaceholder.jpg";
import { getDiffDate } from "../../../redux/functions";

type TStage = {
  stage: IStage;
};

function Stage({ stage }: TStage) {
  const [show, setShow] = useState(false);
  return (
    <>
      {show ? (
        <StageModal stage={stage} closeCallback={setShow} />
      ) : (
        <div onClick={() => setShow(true)} className={styles.stageWrapper}>
          <div className={styles.stageImageWrapper}>
            <img
              src={stage.image_url ? stage.image_url : imagePlaceholder}
              alt=""
            />
          </div>
          <div style={{ fontSize: "12px", fontWeight: 500, color: "#4d80aa" }}>
            {getDiffDate(stage.date)}
          </div>
        </div>
      )}
    </>
  );
}

export default Stage;
