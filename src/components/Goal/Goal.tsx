import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGoal } from "../../interfaces/goal";
import { IStage } from "../../interfaces/stage";
import {
  addView,
  getGoal,
  getStages,
  sendComment,
  setLike,
} from "../../redux/actions";
import photoplaceholder from "../../images/photoplaceholder.jpg";
import styles from "./Goal.module.css";
import UserGoal from "./UserGoal";
import moment from "moment";
import GoalComment from "./GoalComment";
import like from "../../../src/images/like.svg";
import view from "../../../src/images/view.svg";
import { useHistory } from "react-router-dom";
import GoalStage from "./GoalStage";
import Loader from "../Loader/Loader";
import sendIcon from "../../images/send.png";
import { getDiffDate } from "../../redux/functions";

type TGoal = {
  goalId: number;
};

function Goal({ goalId }: TGoal) {
  let goals = useSelector((state: any) => state.goals.goals);
  let thisGoal = goals.filter((goal: IGoal) => goal.id === goalId);
  let stages = useSelector((state: any) => state.stages.stages);
  let thisStages = stages.filter((stages: IStage) => stages.goal_id === goalId);
  let token = useSelector((state: any) => state.user.user.access_token);
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (thisGoal.length === 0) {
      dispatch(getGoal(goalId));
    }
    addView(goalId);
    if (thisStages.length === 0) {
      dispatch(getStages(goalId));
    }
  }, []);

  const [comment, setComment] = useState("");

  const sendCommentClick = () => {
    if (!token) {
      history.push("/myProfile");
      return false;
    }
    if (!comment) {
      return false;
    }
    let momdate = moment(new Date());
    let data = {
      date: momdate.format("YYYY-MM-DD"),
      text: comment,
      goal_id: goalId,
      likes: 0,
    };
    dispatch(sendComment(data));
    setComment("");
  };

  const createLike = (e: any) => {
    e.preventDefault();
    if (!token) {
      history.push("/myProfile");
    } else {
      dispatch(setLike(goalId));
    }
  };

  const loading = useSelector((state: any) => state.app.loading);

  return (
    <div className={styles.mainGoalWrapper}>
      <div>
        <div className={styles.titleWrapper}>
          <div>
            {thisGoal[0]?.user_id && <UserGoal userId={thisGoal[0]?.user_id} />}
          </div>
          <div className={styles.likeWrapper}>
            <div onClick={createLike} className={styles.goalLikeWrapper}>
              <div>
                <img src={like} alt="like" />
              </div>
              <div>{thisGoal[0]?.likes}</div>
            </div>
            <div className={styles.goalLikeWrapper}>
              <div>
                <img src={view} alt="view" />
              </div>
              <div style={{ marginLeft: "4px" }}>{thisGoal[0]?.views}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.createdAt}>
        {" "}
        <span>Создана:</span> {getDiffDate(thisGoal[0]?.created_at)}
      </div>
      <div className={styles.goalTitle}>{thisGoal[0]?.title}</div>
      <div className={styles.goalDesc}>
        Описание: {thisGoal[0]?.description}
      </div>
      {thisStages.length > 0 ? (
        thisStages.map((stage: IStage, i: number) => {
          return <GoalStage key={i} stage={stage} />;
        })
      ) : (
        <div>Пока нет этапов</div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div style={{ marginBottom: "30px" }}>
            <input
              type="text"
              defaultValue={comment}
              onChange={(e: any) => setComment(e.target.value)}
              placeholder="Оставьте комментарий"
            />
            <img
              onClick={sendCommentClick}
              src={sendIcon}
              alt="send comment"
              style={{
                cursor: "pointer",
                width: "50px",
                height: "60px",
                marginTop: "-3px",
              }}
            />
          </div>
        </>
      )}
      <h4>Комментарии</h4>
      <GoalComment goalId={goalId} />
    </div>
  );
}

export default Goal;
