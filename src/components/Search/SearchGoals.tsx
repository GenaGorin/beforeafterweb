import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IGoal } from "../../interfaces/goal";
import { searchGoals } from "../../redux/actions";
import styles from "./Styles.module.css";
import fwdIcon from "../../images/goForward.svg";

function SearchGoals() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const find = (text: string) => {
    if (text.length > 3) {
      searchGoals(text, setResult);
    } else {
      setResult([]);
    }
    setSearch(text);
  };

  return (
    <div>
      <div>Поиск по целям:</div>
      <div>
        <input
          value={search}
          onChange={(e) => find(e.target.value)}
          type="text"
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        {result.length > 0 ? (
          result.map((goal: IGoal) => <Goal key={goal.id} goal={goal} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchGoals;

type TGoal = {
  goal: IGoal;
};

const Goal = ({ goal }: TGoal) => {
  return (
    <NavLink to={"/goal/" + goal.id} className={styles.wrapper}>
      <div className={styles.wrap}>
        <div className={styles.textWrapper}>
          <div>{goal.title?.substr(0, 30)}</div>
          <div>{goal.description?.substr(0, 40)}</div>
        </div>
        <div className={styles.imgWrapp}>
          <img src={fwdIcon} alt="" />
        </div>
      </div>
    </NavLink>
  );
};
