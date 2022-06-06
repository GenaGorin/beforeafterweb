import { useDispatch, useSelector } from "react-redux";
import { IGoal } from "../../interfaces/goal";
import Loader from "../Loader/Loader";
import SingleGoal from "../SIngleGoal/SingleGoal";
import InfiniteScroll from "react-infinite-scroll-component";
import { getFinishedGoals } from "../../redux/actions";
import { useEffect } from "react";
import AmbitiousAuthors from "../AmbitiousAuthors/AmbitiousAuthors";

function FinishedGoalList() {
  const goals: any = useSelector((state: any) => state.goals.goals);
  const finishedGoals = goals.filter((goal: IGoal) => goal.done === 1);
  const goalsCount: any = useSelector((state: any) => state.goals.goalscount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFinishedGoals(0));
  }, []);

  const setNextFetchPortion = () => {
    //setOffset(offset + 3);
    dispatch(getFinishedGoals(finishedGoals.length));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: "65%" }}>
        <InfiniteScroll
          style={{
            overflow: "hidden",
            position: "relative",
          }}
          dataLength={finishedGoals.length} //Тут указываем сколько уже загрузили, а не сколько всего
          next={setNextFetchPortion}
          hasMore={finishedGoals.length < goalsCount}
          loader={<Loader />}
        >
          {finishedGoals.length > 0 ? (
            finishedGoals.map((goal: IGoal) => (
              <SingleGoal key={goal.id} goal={goal} />
            ))
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </InfiniteScroll>
      </div>
      <div style={{ width: "30%" }}>
        <AmbitiousAuthors />
      </div>
    </div>
  );
}

export default FinishedGoalList;
