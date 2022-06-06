import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { IComment } from "../../interfaces/comment";
import { getComments } from "../../redux/actions";
import Loader from "../Loader/Loader";
import SingleComment from "../SIngleGoal/Comments/SingleComment";

type TGoalComment = {
  goalId: number;
};

function GoalComment({ goalId }: TGoalComment) {
  const comments = useSelector((state: any) => state.comments.comments);
  const thisComments = comments.filter(
    (comment: any) => comment.goal_id === goalId
  );
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (thisComments.length === 0) {
      dispatch(getComments(goalId, 0, setCount));
    } else {
      dispatch(getComments(goalId, 0, setCount, true));
    }
  }, []);

  const [offset, setOffset] = useState(0);

  const setNextFetchPortion = () => {
    setOffset(offset + 3);
    dispatch(getComments(goalId, offset + 3));
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <InfiniteScroll
        style={{
          overflow: "hidden",
          position: "relative",
        }}
        dataLength={thisComments.length} //Тут указываем сколько уже загрузили, а не сколько всего
        next={setNextFetchPortion}
        hasMore={thisComments.length < count}
        loader={<Loader />}
      >
        {thisComments.length > 0 ? (
          thisComments.map((comment: IComment) => (
            <SingleComment key={comment.id} comment={comment} />
          ))
        ) : (
          <div>No comments</div>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default GoalComment;
