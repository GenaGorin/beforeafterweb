import { useEffect, useState } from "react";
import womanImage from "../../images/woman.jpg";
import photoplaceholder from "../../images/photoplaceholder.jpg";
import styles from "./CreateStage.module.css";
import CreateStage from "../../components/CreateStage/CreateStage";
import { useDispatch, useSelector } from "react-redux";
import { IGoal } from "../../interfaces/goal";
import {
  changeGoalStatus,
  deleteGoal,
  deleteStage,
  getGoal,
  getStages,
} from "../../redux/actions";
import { IStage } from "../../interfaces/stage";
import Loader from "../../components/Loader/Loader";
import removeIcon from "../../images/remove.png";
import { useHistory } from "react-router-dom";

function CreateStagePage({ match }: any) {
  let goalId = Number(match.params.goalId);
  const [showCreate, setShowCreate] = useState(false);
  let goals = useSelector((state: any) => state.goals.goals);

  let thisGoal = goals.filter((goal: IGoal) => goal.id === goalId);
  const dispatch = useDispatch();

  let stages = useSelector((state: any) => state.stages.stages);
  let thisStages = stages.filter((stages: IStage) => stages.goal_id === goalId);

  const loading = useSelector((state: any) => state.app.loading);
  const history = useHistory();

  useEffect(() => {
    if (thisGoal.length === 0) {
      dispatch(getGoal(goalId));
    }
    if (thisStages.length === 0) {
      dispatch(getStages(goalId));
    }
  }, []);

  const changeGoalStatusClick = (status: number) => {
    dispatch(changeGoalStatus(goalId, status));
  };

  if (loading) {
    return <Loader />;
  }

  const removeStageClick = (stage: IStage) => {
    if (window.confirm("Вы уверены что хотите удалить этап?")) {
      dispatch(deleteStage(stage.goal_id, stage.id));
    }
  };

  const removeGoalClick = () => {
    if (window.confirm("Вы уверены что хотите удалить цель?")) {
      dispatch(deleteGoal(thisGoal[0]?.id));
    }
    history.push("/myProfile");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.title}>
        Добавьте этапы цели <span> {thisGoal[0]?.title}</span>{" "}
        {thisStages.length > 0 ? "" : ", если такие уже есть"}
      </div>
      {thisStages.length > 0 ? (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Фото</th>
                <th scope="col">Дата</th>
                <th scope="col">Описание</th>
              </tr>
            </thead>
            <tbody>
              {thisStages.map((stage: IStage, i: number) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                      <div className={styles.imageWrapper}>
                        <img
                          src={
                            stage.image_url ? stage.image_url : photoplaceholder
                          }
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{stage.date}</td>
                    <td>{stage.description}</td>
                    <td
                      style={{
                        width: "220px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          style={{
                            width: "25px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                          src={removeIcon}
                          alt="remove"
                          onClick={() => removeStageClick(stage)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
      {showCreate ? (
        <CreateStage goalId={goalId} />
      ) : (
        <button
          className="saveButton"
          onClick={() => {
            setShowCreate(true);
          }}
          style={{ marginBottom: "20px" }}
        >
          Добавить этап
        </button>
      )}
      <div style={{ display: "flex" }}>
        {thisStages.length > 0 ? (
          <div>
            {thisGoal[0]?.done ? (
              <div>
                <input
                  onClick={() => changeGoalStatusClick(0)}
                  type="checkbox"
                  id="scales"
                  name="scales"
                  checked
                />
                <label style={{ marginLeft: "15px" }} htmlFor="scales">
                  Отменить завершение
                </label>
              </div>
            ) : (
              <div>
                <input
                  onClick={() => changeGoalStatusClick(1)}
                  type="checkbox"
                  id="scales"
                  name="scales"
                />
                <label style={{ marginLeft: "15px" }} htmlFor="scales">
                  Завершить цель
                </label>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <div
          style={{
            marginLeft: "30px",
            fontWeight: 600,
            cursor: "pointer",
            color: "#4d80aa",
          }}
          onClick={removeGoalClick}
        >
          Удалить цель
        </div>
      </div>
    </div>
  );
}

export default CreateStagePage;
