import photoPlaceholder from "../../../src/images/photoplaceholder.jpg";
import styles from "./CreateStage.module.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { createStage, showAlert } from "../../redux/actions";
import Alert from "../Alert/Alert";
import Loader from "../Loader/Loader";

type TCreateStage = {
  goalId: number;
};

function CreateStage({ goalId }: TCreateStage) {
  const [src, setSrc] = useState("");
  const [file, setFile] = useState<any>();

  const setPhoto = (e: any) => {
    var reader = new FileReader();
    reader.onload = function (e: any) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  const [startDate, setStartDate] = useState();

  const [sendDate, setSendDate] = useState("");

  const setDateIC = (date: any) => {
    let momdate = moment(date);
    setSendDate(momdate.format("YYYY-MM-DD"));
    setStartDate(date);
  };
  const dispatch = useDispatch();

  const [descriptiontext, setDescriptiontext] = useState("");
  const alert = useSelector((state: any) => state.app.alert);

  const clearFields = () => {
    setDescriptiontext("");
    setSrc("");
  };

  const sendStage = () => {
    if (!file || !sendDate || !descriptiontext) {
      dispatch(showAlert("Заполните этап"));
      return false;
    }
    let data = {
      file: file,
      date: sendDate,
      description: descriptiontext,
      //goalId: goalId,
    };

    dispatch(createStage(data, goalId, clearFields));
  };

  const loading = useSelector((state: any) => state.app.loading);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {alert && <Alert text={alert} />}
      <div>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td style={{ width: "122px" }}>
                <div className={styles.imgWrapper}>
                  <label htmlFor="stageImage">
                    {src ? (
                      <img style={{ width: "100px" }} src={src} alt="ava" />
                    ) : (
                      <></>
                    )}
                  </label>
                  <div className="input__wrapper">
                    <input
                      style={{ width: "80px" }}
                      onChange={(e: any) => setPhoto(e)}
                      type="file"
                      name="file"
                      id="input__file"
                      className="input input__file"
                    />
                    <label htmlFor="input__file" className="input__file-button">
                      <span className="input__file-button-text">
                        Выберите файл
                      </span>
                    </label>
                  </div>
                </div>
              </td>
              <td style={{ width: "99px" }}>
                <div className={styles.datepickerWrapper}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: any) => setDateIC(date)}
                  />
                </div>
              </td>
              <td style={{ width: "887px" }}>
                <div className={styles.textareaWrapper}>
                  <textarea
                    onChange={(e) => setDescriptiontext(e.target.value)}
                    defaultValue={descriptiontext}
                    placeholder="Опишите этап"
                    style={{ width: "100%" }}
                  ></textarea>
                </div>
              </td>
              <td>
                <button
                  style={{ marginTop: "27px" }}
                  onClick={sendStage}
                  className="saveButton"
                >
                  Сохранить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CreateStage;

/*

<div className={styles.stageWrapper}>
        {alert && <Alert text={alert} />}
        <div>
          <div className={styles.imgWrapper}>
            <label htmlFor="stageImage">
              {src ? (
                <img src={src} alt="ava" />
              ) : (
                <img src={photoPlaceholder} alt="stage" />
              )}
            </label>
            <input
              onChange={(e: any) => setPhoto(e)}
              type="file"
              className="stageImage"
              name="stageImage"
            />
          </div>
          <div className={styles.datepickerWrapper}>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setDateIC(date)}
            />
          </div>
          <div className={styles.textareaWrapper}>
            <textarea
              onChange={(e) => setDescriptiontext(e.target.value)}
              defaultValue={descriptiontext}
              placeholder="Опишите этап"
            ></textarea>
          </div>
          <div style={{ marginTop: "10px" }}>
            <button onClick={sendStage} className="saveButton">
              Сохранить
            </button>
          </div>
        </div>
      </div>
*/
