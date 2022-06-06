import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscribe,
  getUser,
  subscribe,
  unSubscribe,
} from "../../redux/actions";
import avaPlaceholder from "../../images/image_placeholder.png";
import styles from "./Goal.module.css";
import { NavLink } from "react-router-dom";
import SubscribeBtn from "../GeneralComponents/SubscribeBtn/SubscribeBtn";
import { useHistory } from "react-router";

type TUserGoal = {
  userId: number;
};

function UserGoal({ userId }: TUserGoal) {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === userId);

  const me = useSelector((state: any) => state.user.user);
  const [subs, setSubs] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const subscribeClick = (e: any) => {
    e.preventDefault();
    if (!me?.id) {
      history.push("/myProfile");
      return false;
    }
    dispatch(subscribe(userId, setSubs));
  };
  const unSubscribeClick = (e: any) => {
    e.preventDefault();
    dispatch(unSubscribe(userId, setSubs));
  };

  useEffect(() => {
    if (thisUsers.length === 0) {
      dispatch(getUser(userId));
    }
    if (me?.id) {
      dispatch(checkSubscribe(userId, setSubs));
    }
  }, []);
  return (
    <NavLink className={styles.authorWrapperHref} to={"/profile/" + userId}>
      <div className={styles.authorWrapper}>
        <div className={styles.authorWrapperData}>
          <div>
            <img
              src={
                thisUsers[0]?.image_url
                  ? thisUsers[0]?.image_url
                  : avaPlaceholder
              }
              alt="Ava"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            {thisUsers[0]?.firstname + " " + thisUsers[0]?.lastname}
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          {" "}
          {me?.id === userId ? (
            <div></div>
          ) : (
            <>
              {subs ? (
                <SubscribeBtn text="Отписаться" callback={unSubscribeClick} />
              ) : (
                <SubscribeBtn text="Подписаться" callback={subscribeClick} />
              )}
            </>
          )}
        </div>
      </div>
    </NavLink>
  );
}

export default UserGoal;
