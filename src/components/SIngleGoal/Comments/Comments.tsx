import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IComment } from "../../../interfaces/comment";
import { getComments } from "../../../redux/actions";
import SingleComment from "./SingleComment";

type TComments = {
  goalId: number;
};

function Comments({ goalId }: TComments) {
  const comments = useSelector((state: any) => state.comments.comments);
  const thisComments = comments.filter(
    (comment: any) => comment.goal_id === goalId
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (thisComments.length === 0) {
      dispatch(getComments(goalId, 0));
    }
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      {thisComments.length > 0 &&
        thisComments.map((comment: IComment) => (
          <SingleComment key={comment.id} comment={comment} />
        ))}
    </div>
  );
}

export default Comments;
