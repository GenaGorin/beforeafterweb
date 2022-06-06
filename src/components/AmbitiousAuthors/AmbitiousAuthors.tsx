import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAmbitiousAuthors } from "../../redux/actions";
import Loader from "../Loader/Loader";
import GoalAuthor from "../SIngleGoal/GoalAuthor/GoalAuthor";
import styles from "./AmbitiousAuthors.module.css";

function AmbitiousAuthors() {
  const dispatch = useDispatch();
  const authorsIds = useSelector((state: any) => state.ambitious.user_ids);
  const loading = useSelector((state: any) => state.app.loading);
  useEffect(() => {
    if (authorsIds.length === 0) {
      dispatch(getAmbitiousAuthors());
    }
  }, []);

  return (
    <div className={styles.authorsWrapper}>
      {" "}
      <div className={styles.title}>Самые амбициозные авторы</div>
      {loading ? (
        <Loader />
      ) : (
        authorsIds.length > 0 && (
          <div className={styles.authorsWrapperIter}>
            {authorsIds.map((userId: number) => (
              <div key={userId} className={styles.singleAuthorWrapper}>
                <GoalAuthor userId={userId} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default React.memo(AmbitiousAuthors);
