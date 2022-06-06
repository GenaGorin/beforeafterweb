import { IStage } from "../../interfaces/stage";
import styles from "./Goal.module.css";
import placeholder from "../../images/photoplaceholder.jpg";
import { getDiffDate } from "../../redux/functions";

type TGoalStage = {
  stage: IStage;
};

function GoalStage({ stage }: TGoalStage) {
  return (
    <div>
      <div style={{ marginBottom: "5px" }} className={styles.createdAt}>
        {getDiffDate(stage.date)}
      </div>
      <div className={styles.imageWrapp}>
        <img
          src={stage.image_url ? stage.image_url : placeholder}
          alt="photo"
        />
      </div>
      <div style={{ marginTop: "10px" }} className={styles.goalDesc}>
        {stage.description}
      </div>
    </div>
  );
}

export default GoalStage;
