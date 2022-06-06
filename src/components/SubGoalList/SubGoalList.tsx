import { useDispatch, useSelector } from "react-redux";
import { IGoal } from "../../interfaces/goal";
import Loader from "../Loader/Loader";
import SingleGoal from "../SIngleGoal/SingleGoal";
import InfiniteScroll from "react-infinite-scroll-component";
import { getSubGoals } from "../../redux/actions";
import { useEffect, useState } from "react";
import AmbitiousAuthors from "../AmbitiousAuthors/AmbitiousAuthors";

function SubGoalList() {
  const subGoals: any = useSelector((state: any) => state.subGoals.goals);
  const subGoalsCount: any = useSelector(
    (state: any) => state.subGoals.goalscount
  );
  const [haveGoals, setHaveGoals] = useState(true);

  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(getSubGoals(offset, setHaveGoals));
  }, []);

  const setNextFetchPortion = () => {
    setOffset(offset + 3);
    dispatch(getSubGoals(offset + 3, setHaveGoals));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "65%" }}>
        {haveGoals ? (
          <InfiniteScroll
            style={{
              overflow: "hidden",
              position: "relative",
            }}
            dataLength={subGoals.length} //Тут указываем сколько уже загрузили, а не сколько всего
            next={setNextFetchPortion}
            hasMore={subGoals.length < subGoalsCount}
            loader={<Loader />}
          >
            {subGoals.length > 0 ? (
              subGoals.map((goal: IGoal) => (
                <SingleGoal key={goal.id} goal={goal} />
              ))
            ) : (
              <Loader />
            )}
          </InfiniteScroll>
        ) : (
          <div>Подпишитесь на кого либо, что бы наблюдать за их целями</div>
        )}
      </div>
      <div style={{ width: "30%" }}>
        <AmbitiousAuthors />
      </div>
    </div>
  );
}

export default SubGoalList;
