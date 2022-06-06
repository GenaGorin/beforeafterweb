import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getFollowers } from "../../../redux/actions";
import Loader from "../../Loader/Loader";
import GoalAuthor from "../../SIngleGoal/GoalAuthor/GoalAuthor";
import styles from "../Profile.module.css";

type TProfileFollowers = {
  userId: number;
  count: number;
};

function ProfileFollowers({ userId, count }: TProfileFollowers) {
  const [userIds, setUserIds] = useState<any>([]);

  const setFollowers = (data: any) => {
    let newIds = [...userIds, ...data];

    setUserIds(newIds);
  };

  useEffect(() => {
    getFollowers(userId, 0, setFollowers);
  }, []);

  const setNextFetchPortion = () => {
    getFollowers(userId, userIds.length, setFollowers);
  };

  return (
    <div className={styles.goalsWrapper}>
      <h4>Подписчики:</h4>
      <InfiniteScroll
        style={{
          overflow: "hidden",
          position: "relative",
        }}
        dataLength={userIds.length} //Тут указываем сколько уже загрузили, а не сколько всего
        next={setNextFetchPortion}
        hasMore={userIds.length < count}
        loader={<Loader />}
      >
        {userIds.length > 0 ? (
          userIds.map((ids: any) => {
            return (
              <div key={ids.id} className={styles.singleGoal}>
                <GoalAuthor userId={ids.follower_id} />
              </div>
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

export default ProfileFollowers;
