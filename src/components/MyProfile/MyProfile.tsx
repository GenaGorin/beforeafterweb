import { useDispatch, useSelector } from "react-redux";
import { getSubsInfo, updateAva } from "../../redux/actions";
import imagePlaceholder from "../../images/image_placeholder.png";
import styles from "./MyProfile.module.css";

import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import ProfileFollowers from "../Profile/ProfileFollowers/ProfileFollowers";
import ProfileGoals from "../Profile/ProfileGoals/ProfileGoals";
import ProfileIFollow from "../Profile/ProfileIFollow/ProfileIFollow";
import ProfileSettings from "./settings/ProfileSettings";

function MyProfile() {
  const dispatch = useDispatch();
  const me = useSelector((state: any) => state.user.user);
  const [src, setSrc] = useState("");

  const sendFile = (e: any) => {
    var reader = new FileReader();
    reader.onload = function (e: any) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    dispatch(updateAva(e.target.files[0]));
  };

  const loading = useSelector((state: any) => state.app.loading);
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
    getSubsInfo(me.id, countSubs);
  }, [me]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.myProfileWrap}>
        <div className={styles.nameWrapper}>
          <div className={styles.avaWrapper}>
            <label htmlFor="ava">
              {src ? (
                <img src={src} alt="ava" />
              ) : (
                <img
                  src={me.image_url ? me.image_url : imagePlaceholder}
                  alt="ava"
                />
              )}
            </label>
            <input
              onChange={(e: any) => sendFile(e)}
              type="file"
              id="ava"
              name="ava"
            />
          </div>
          <div className={styles.profileName}>
            <div>{me?.firstname + " " + me?.lastname}</div>
            <span>{me?.email}</span>
          </div>
        </div>
        <div>
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
              onClick={() => setTab("settings")}
              className={tab === "settings" ? styles.tabActive : ""}
            >
              НАСТРОЙКИ{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabContentWrapper}>
        {me?.id && (
          <div>
            {tab === "goals" ? (
              goals > 0 ? (
                <ProfileGoals href="createstage" userId={me.id} count={goals} />
              ) : (
                "Нету целей"
              )
            ) : (
              ""
            )}
            {tab === "followMe" ? (
              followMe > 0 ? (
                <ProfileFollowers userId={me.id} count={followMe} />
              ) : (
                "Нет подписчиков"
              )
            ) : (
              ""
            )}
            {tab === "iFollow" ? (
              iFollow > 0 ? (
                <ProfileIFollow
                  userId={me.id}
                  count={iFollow}
                  withUnsubscribe={true}
                />
              ) : (
                "Нет подписок"
              )
            ) : (
              ""
            )}
            {tab === "settings" ? <ProfileSettings /> : ""}
          </div>
        )}
      </div>
    </>
  );
}

export default MyProfile;
