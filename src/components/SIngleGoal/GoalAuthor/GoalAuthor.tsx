import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, unSubscribe } from "../../../redux/actions";
import styles from "../SingleGoal.module.css";
import avaPlaceholder from "../../../images/image_placeholder.png";
import official from "../../../images/official.svg";
import { NavLink } from "react-router-dom";
import SubscribeBtn from "../../GeneralComponents/SubscribeBtn/SubscribeBtn";

type TGoalAuthor = {
  userId: number;
  withUnsubscribe?: boolean;
};

function GoalAuthor({ userId, withUnsubscribe }: TGoalAuthor) {
  const users = useSelector((state: any) => state.users.users);
  const thisUsers = users.filter((user: any) => user.id === userId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (thisUsers.length === 0) {
      dispatch(getUser(userId));
    }
  }, []);

  const [subbed, setSubbed] = useState(true);

  const unSubscribeClick = (e: any) => {
    e.preventDefault();
    dispatch(unSubscribe(userId, setSubbed));
  };

  return (
    <NavLink to={"/profile/" + userId} className={styles.authorWrapper}>
      <div className={styles.authorWrapperData}>
        <div>
          <img
            src={
              thisUsers[0]?.image_url ? thisUsers[0]?.image_url : avaPlaceholder
            }
            alt="Ava"
          />
          {thisUsers[0]?.official ? (
            <img src={official} alt="Official account" />
          ) : (
            ""
          )}
        </div>
        <div className={styles.authorName}>{thisUsers[0]?.firstname}</div>
        <div className={styles.authorName}>{thisUsers[0]?.lastname}</div>
        {withUnsubscribe && subbed && (
          <div style={{ marginTop: "15px", marginLeft: "15px" }}>
            <SubscribeBtn text="Отписаться" callback={unSubscribeClick} />
          </div>
        )}
      </div>
    </NavLink>
  );
}

export default GoalAuthor;
