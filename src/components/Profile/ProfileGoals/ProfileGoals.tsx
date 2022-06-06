import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IGoal } from "../../../interfaces/goal";
import { getUserGoals } from "../../../redux/actions";
import Loader from "../../Loader/Loader";
import styles from "../Profile.module.css";
import fwdIcon from "../../../images/goForward.svg";

type TProfileGoals = {
  userId: number;
  count: number;
  href: string;
};

function ProfileGoals({ userId, count, href }: TProfileGoals) {
  const goals: any = useSelector((state: any) => state.goals.goals);
  let thisGoals = goals.filter((goal: IGoal) => goal.user_id === userId);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    if (thisGoals.length < 10) {
      dispatch(getUserGoals(userId, offset));
    }
  }, []);

  const setNextFetchPortion = () => {
    setOffset(offset + 10);
    dispatch(getUserGoals(userId, offset + 10));
  };

  return (
    <div className={styles.goalsWrapper}>
      <InfiniteScroll
        style={{
          overflow: "hidden",
          position: "relative",
        }}
        dataLength={goals.length} //Тут указываем сколько уже загрузили, а не сколько всего
        next={setNextFetchPortion}
        hasMore={goals.length < count}
        loader={<Loader />}
      >
        {thisGoals.length > 0 ? (
          thisGoals.map((goal: IGoal) => {
            return (
              <NavLink
                to={"/" + href + "/" + goal.id}
                key={goal.id}
                className={styles.singleGoal}
              >
                <div className={styles.goalWrap}>
                  <div className={styles.goalWrapText}>
                    <div>{goal.title}</div>
                    <div>{goal?.description}</div>
                  </div>
                  <div className={styles.goalWrapImg}>
                    <img src={fwdIcon} alt="forward" />
                  </div>
                </div>
              </NavLink>
            );
          })
        ) : (
          <div>
            <Loader />
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default ProfileGoals;
