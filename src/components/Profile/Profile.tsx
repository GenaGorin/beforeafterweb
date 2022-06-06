import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSubsInfo } from "../../redux/actions";
import UserGoal from "../Goal/UserGoal";
import AboutProfile from "./AboutProfile/AboutProfile";
import styles from "./Profile.module.css";
import ProfileFollowers from "./ProfileFollowers/ProfileFollowers";
import ProfileGoals from "./ProfileGoals/ProfileGoals";
import ProfileIFollow from "./ProfileIFollow/ProfileIFollow";

type TProfile = {
  userId: number;
};

function Profile({ userId }: TProfile) {
  const users = useSelector((state: any) => state.users.users);
  const thisUser = users.filter((user: any) => user.id === userId);

  const [iFollow, setIFollow] = useState(0);
  const [followMe, setFoolowMe] = useState(0);
  const [goals, setGoals] = useState(0);

  const [tab, setTab] = useState("goals");

  const countSubs = (data: any) => {
    setIFollow(data["i_follow"]);
    setFoolowMe(data["follow_me"]);
    setGoals(data["goals"]);
  };

  useEffect(() => {
    getSubsInfo(userId, countSubs);
  }, [userId]);

  return (
    <div>
      <div className={styles.profileWrapper}>
        <div>
          <UserGoal userId={userId} />
        </div>
        <div className={styles.tabsWrapper}>
          <div
            onClick={() => setTab("goals")}
            className={tab === "goals" ? styles.tabActive : ""}
          >
            ЦЕЛИ ({goals})
          </div>
          <div
            onClick={() => setTab("followMe")}
            className={tab === "followMe" ? styles.tabActive : ""}
          >
            {" "}
            ПОДПИСЧИКИ({followMe}){" "}
          </div>
          <div
            onClick={() => setTab("iFollow")}
            className={tab === "iFollow" ? styles.tabActive : ""}
          >
            ПОДПИСКИ ({iFollow})
          </div>
          <div
            onClick={() => setTab("about")}
            className={tab === "about" ? styles.tabActive : ""}
          >
            О ПРОФИЛЕ{" "}
          </div>
        </div>
      </div>
      <div className={styles.tabContentWrapper}>
        {tab === "goals" ? (
          goals > 0 ? (
            <ProfileGoals href="goal" userId={userId} count={goals} />
          ) : (
            "Нету целей"
          )
        ) : (
          ""
        )}
        {tab === "followMe" ? (
          followMe > 0 ? (
            <ProfileFollowers userId={userId} count={followMe} />
          ) : (
            "Нет подписчиков"
          )
        ) : (
          ""
        )}
        {tab === "iFollow" ? (
          iFollow > 0 ? (
            <ProfileIFollow userId={userId} count={iFollow} />
          ) : (
            "Нет подписок"
          )
        ) : (
          ""
        )}
        {tab === "about" ? <AboutProfile user={thisUser[0]} /> : ""}
      </div>
    </div>
  );
}

export default Profile;
