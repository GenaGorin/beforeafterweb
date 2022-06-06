import { useDispatch, useSelector } from "react-redux";
import { IGoal } from "../../interfaces/goal";
import Loader from "../Loader/Loader";
import SingleGoal from "../SIngleGoal/SingleGoal";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPopularGoals } from "../../redux/actions";
import { useEffect, useState } from "react";
import AmbitiousAuthors from "../AmbitiousAuthors/AmbitiousAuthors";

function PopularGoalsList() {
  const popularGoals: any = useSelector(
    (state: any) => state.popularGoals.goals
  );
  const popularGoalsCount: any = useSelector(
    (state: any) => state.popularGoals.goalscount
  );

  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(getPopularGoals(offset));
  }, []);

  const setNextFetchPortion = () => {
    setOffset(offset + 3);
    dispatch(getPopularGoals(offset + 3));
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
          dataLength={popularGoals.length} //Тут указываем сколько уже загрузили, а не сколько всего
          next={setNextFetchPortion}
          hasMore={popularGoals.length < popularGoalsCount}
          loader={<Loader />}
        >
          {popularGoals.length > 0 ? (
            popularGoals.map((goal: IGoal) => (
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

export default PopularGoalsList;
