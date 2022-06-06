import { useDispatch, useSelector } from "react-redux";
import { IGoal } from "../../interfaces/goal";
import Loader from "../Loader/Loader";
import SingleGoal from "../SIngleGoal/SingleGoal";
import InfiniteScroll from "react-infinite-scroll-component";
import { getTagGoals } from "../../redux/actions";
import { useEffect, useState } from "react";
import Alert from "../Alert/Alert";
import AmbitiousAuthors from "../AmbitiousAuthors/AmbitiousAuthors";

type TTagGoalList = {
  tagId: number;
};

function TagGoalList({ tagId }: TTagGoalList) {
  const tagGoals: any = useSelector((state: any) => state.tagGoals.goals);
  const tagGoalsCount: any = useSelector(
    (state: any) => state.tagGoals.goalscount
  );
  const alert = useSelector((state: any) => state.app.alert);

  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(getTagGoals(tagId, offset));
  }, []);

  const setNextFetchPortion = () => {
    setOffset(offset + 3);
    dispatch(getTagGoals(tagId, offset + 3));
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
          dataLength={tagGoals.length} //Тут указываем сколько уже загрузили, а не сколько всего
          next={setNextFetchPortion}
          hasMore={tagGoals.length < tagGoalsCount}
          loader={<Loader />}
        >
          {tagGoals.length > 0 ? (
            tagGoals.map((goal: IGoal) => (
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
      {alert && <Alert text={"Нету постов с таким тегом"} />}
    </div>
  );
}

export default TagGoalList;
