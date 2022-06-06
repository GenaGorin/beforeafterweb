import { useDispatch, useSelector } from "react-redux";
import { IGoal } from "../../interfaces/goal";
import Loader from "../Loader/Loader";
import SingleGoal from "../SIngleGoal/SingleGoal";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGoals } from "../../redux/actions";
import { useEffect, useState } from "react";
import AmbitiousAuthors from "../AmbitiousAuthors/AmbitiousAuthors";

function GoalsList() {
  const goals: any = useSelector((state: any) => state.goals.goals);
  const goalsCount: any = useSelector((state: any) => state.goals.goalscount);

  const dispatch = useDispatch();
  // const [offset, setOffset] = useState(goals.length);
  // console.log("offsest", offset);
  //
  useEffect(() => {
    dispatch(getGoals(0));
  }, []);

  const setNextFetchPortion = () => {
    //setOffset(offset + 3);
    dispatch(getGoals(goals.length));
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
          dataLength={goals.length} //Тут указываем сколько уже загрузили, а не сколько всего
          next={setNextFetchPortion}
          hasMore={goals.length < goalsCount}
          loader={<Loader />}
        >
          {goals.length > 0 ? (
            goals.map((goal: IGoal) => <SingleGoal key={goal.id} goal={goal} />)
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

export default GoalsList;
