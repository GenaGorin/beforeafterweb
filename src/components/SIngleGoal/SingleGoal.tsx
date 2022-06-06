import { IGoal } from "../../interfaces/goal";
import { IStage } from "../../interfaces/stage";
import styles from "./SingleGoal.module.css";
import Stage from "./Stage/Stage";
import like from "../../../src/images/like.svg";
import commentIcon from "../../../src/images/comment.svg";
import done from "../../../src/images/doned.png";
import view from "../../../src/images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCommentsCount,
  getStages,
  getTags,
  setLike,
} from "../../redux/actions";
import GoalAuthor from "./GoalAuthor/GoalAuthor";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import TagsBlock from "../TagsBlock/TagsBlock";
import { getDiffDate } from "../../redux/functions";

type TSingleGoal = {
  goal: IGoal;
};

function SingleGoal({ goal }: TSingleGoal) {
  const stages: any = useSelector((state: any) => state.stages.stages);
  const dispatch = useDispatch();
  let thisStages = stages.filter((stage: IStage) => stage.goal_id === goal.id);
  let token = useSelector((state: any) => state.user.user.access_token);
  let history = useHistory();

  const [commentsCount, setCommentsCount] = useState(0);
  const [tags, setTags] = useState<any>();

  useEffect(() => {
    if (thisStages.length === 0) {
      dispatch(getStages(goal.id));
    }
    getCommentsCount(goal.id, setCommentsCount);
    getTags(goal.id, setTags);
    //console.log("use effect called", goal.id);
  }, []);

  //console.log("render goal", goal.id);

  const createLike = (e: any) => {
    e.preventDefault();
    if (!token) {
      history.push("/myProfile");
    } else {
      dispatch(setLike(goal.id));
    }
  };

  return (
    <div className={styles.goalWrapper}>
      <div className={styles.goalAuthorWrapperDone}>
        <GoalAuthor userId={goal.user_id} />
        {goal.done ? (
          <img className={styles.donedIcon} src={done} alt="Цель завершена" />
        ) : (
          ""
        )}
      </div>

      <NavLink className={styles.singleGoalWrapp} to={"/goal/" + goal.id}>
        <div className={styles.goalDatasWrapper}>
          <div>
            Создана: <span>{getDiffDate(goal.created_at)}</span>
          </div>
          <div>
            Последнее обновление: <span>{getDiffDate(goal.last_update)}</span>
          </div>
        </div>
        <div className={styles.goalTitle}> {goal.title}</div>
        <div className={styles.goalDescription}>{goal.description}</div>

        <div className={styles.stagesWrapper}>
          {thisStages.map((stage: IStage) => (
            <Stage key={stage.id} stage={stage} />
          ))}
        </div>
        <div className={styles.commentLikeWrapper}>
          <div className={styles.likesWrapper} style={{ marginRight: "20px" }}>
            <div>
              <img onClick={createLike} src={like} alt="like" />
            </div>
            <div>{goal.likes}</div>
          </div>

          <div className={styles.likesWrapper} style={{ marginRight: "20px" }}>
            <div>
              <img
                style={{ marginTop: "3px" }}
                src={commentIcon}
                alt="commentIcon"
              />
            </div>
            <div>{commentsCount}</div>
          </div>
          <div className={styles.likesWrapper}>
            <div>
              <img src={view} alt="view" />
            </div>
            <div>{goal.views}</div>
          </div>
        </div>
      </NavLink>
      <div>{tags?.length > 0 && <TagsBlock goalTags={tags} />}</div>
    </div>
  );
}

export default SingleGoal;

/*

{goal.stages.map((stage: IStage) => (
          <Stage key={stage.id} stage={stage} />
        ))}
        */
