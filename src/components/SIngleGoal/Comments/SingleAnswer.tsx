import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { IAnswer } from "../../../interfaces/answer";
import { createAnswerLike, getUser } from "../../../redux/actions";
import styles from "../SingleGoal.module.css";
import avaPlaceholder from "../../../images/image_placeholder.png";
import likeIcon from "../../../images/like.svg";
import { getDiffDate } from "../../../redux/functions";

type TSingleAnswer = {
  answer: IAnswer;
};

function SingleAnswer({ answer }: TSingleAnswer) {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === answer.user_id);
  const dispatch = useDispatch();
  let token = useSelector((state: any) => state.user.user.access_token);

  const [likes, setLikes] = useState(answer.likes);

  useEffect(() => {
    if (thisUsers.length === 0) {
      dispatch(getUser(answer.user_id));
    }
  }, []);

  const updateLike = () => {
    let newLikes = likes + 1;
    setLikes(newLikes);
  };

  let history = useHistory();
  const createAnswertLikeClick = () => {
    if (!token) {
      history.push("/myProfile");
    } else {
      createAnswerLike(answer.id, updateLike);
    }
  };

  return (
    <div
      className={styles.singleCommentWrapper}
      style={{ borderBottom: "none" }}
    >
      <NavLink to={"/profile/" + answer.user_id}>
        <img
          src={
            thisUsers[0]?.image_url ? thisUsers[0]?.image_url : avaPlaceholder
          }
          alt="Ava"
        />
      </NavLink>
      <div className={styles.nameWrapper}>
        <div style={{ display: "flex" }}>
          <div>
            {thisUsers[0]?.firstname} <span>{getDiffDate(answer.date)}</span>{" "}
          </div>
        </div>
        <div style={{ fontSize: "14px" }}>{answer.text}</div>
        <div style={{ display: "flex" }}>
          <div
            onClick={createAnswertLikeClick}
            style={{ cursor: "pointer", display: "flex" }}
          >
            <img
              style={{ width: "23px", height: "23px" }}
              src={likeIcon}
              alt="Like"
            />
            <div style={{ fontSize: 14, color: "#6997d3", marginTop: "3px" }}>
              {likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleAnswer;
