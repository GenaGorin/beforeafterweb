import { useDispatch, useSelector } from "react-redux";
import { IComment } from "../../../interfaces/comment";
import styles from "../SingleGoal.module.css";
import avaPlaceholder from "../../../images/image_placeholder.png";
import { useEffect, useState } from "react";
import {
  createAnswer,
  createCommentLike,
  getAnswersCount,
  getUser,
} from "../../../redux/actions";
import { NavLink, useHistory } from "react-router-dom";
import likeIcon from "../../../images/like.svg";
import sendIcon from "../../../images/send.png";
import moment from "moment";
import trangleIcon from "../../../images/trangleDown.png";
import trangleUpIcon from "../../../images/trangleUp.png";
import AnswersComponent from "./AnswersComponent";
import { getDiffDate } from "../../../redux/functions";

type TSingleComment = {
  comment: IComment;
};

function SingleComment({ comment }: TSingleComment) {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === comment.user_id);
  const dispatch = useDispatch();
  let token = useSelector((state: any) => state.user.user.access_token);

  const [answersCount, setAnswersCount] = useState(0);

  const [answerMode, setAnswerMode] = useState(false);
  useEffect(() => {
    if (thisUsers.length === 0) {
      dispatch(getUser(comment.user_id));
    }
    getAnswersCount(comment.id, setAnswersCount);
  }, []);

  const [showAnswers, setShowAnswers] = useState(false);

  let history = useHistory();
  const createCommentLikeClick = () => {
    if (!token) {
      history.push("/myProfile");
    } else {
      dispatch(createCommentLike(comment.id));
    }
  };

  const [answer, setAnswer] = useState("");

  const sendAnswerClick = () => {
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
      text: answer,
      comment_id: comment.id,
      likes: 0,
    };
    createAnswer(data);
    let newAnswerQty = Number(answersCount) + 1;
    setAnswersCount(newAnswerQty);
    setAnswer("");
  };

  return (
    <div className={styles.singleCommentWrapper}>
      <NavLink to={"/profile/" + comment.user_id}>
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
            {thisUsers[0]?.firstname} <span>{getDiffDate(comment.date)}</span>{" "}
          </div>
        </div>
        <div>{comment.text}</div>
        <div style={{ display: "flex" }}>
          <div
            onClick={createCommentLikeClick}
            style={{ cursor: "pointer", display: "flex" }}
          >
            <img
              style={{ width: "23px", height: "23px" }}
              src={likeIcon}
              alt="Like"
            />
            <div style={{ fontSize: 14, color: "#6997d3", marginTop: "3px" }}>
              {comment.likes}
            </div>
          </div>
          <div
            style={{
              color: "#6997d3",
              marginLeft: "10px",
              marginTop: "1px",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={() => setAnswerMode(true)}
          >
            ответить
          </div>
        </div>
        {answerMode ? (
          <div>
            <input
              type="text"
              autoFocus
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <img
              style={{
                cursor: "pointer",
                width: "50px",
                height: "60px",
                marginTop: "-3px",
              }}
              alt="Send comment"
              src={sendIcon}
              onClick={sendAnswerClick}
            />
          </div>
        ) : (
          <></>
        )}
        {answersCount > 0 ? (
          <>
            {showAnswers ? (
              <div
                style={{
                  color: "#6997d3",
                  fontWeight: 600,
                  marginTop: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setShowAnswers(false)}
              >
                Скрыть {answersCount} ответов
                <img
                  style={{ width: "20px", height: "12px", marginLeft: "5px" }}
                  src={trangleUpIcon}
                />
              </div>
            ) : (
              <div
                style={{
                  color: "#6997d3",
                  fontWeight: 600,
                  marginTop: "16px",
                  cursor: "pointer",
                }}
                onClick={() => setShowAnswers(true)}
              >
                Показать {answersCount} ответов
                <img
                  style={{ width: "20px", height: "12px", marginLeft: "5px" }}
                  src={trangleIcon}
                />
              </div>
            )}

            {showAnswers ? (
              <AnswersComponent commentId={comment.id} count={answersCount} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
