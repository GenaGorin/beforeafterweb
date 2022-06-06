import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "../Alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "../../redux/actions";
import moment from "moment";
import { useHistory } from "react-router";
import Loader from "../Loader/Loader";
import styles from "./CreateGoal.module.css";

function CreateGoal() {
  const history = useHistory();

  const redirect = (data: any) => {
    history.push("/createstage/" + data.data.id);
  };

  const alert = useSelector((state: any) => state.app.alert);
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.app.loading);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.createWrapper}>
      <h4>Создайте цель или расскажите о уже достигнутой</h4>
      {alert && <Alert text={alert} />}
      <Formik
        initialValues={{
          title: "",
          description: "",
          tags: "",
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Укажите название цели"),
          description: Yup.string().required("Укажите описание цели"),
        })}
        onSubmit={(fields: any) => {
          if (fields?.done) {
            fields.done = 1;
          } else {
            fields.done = 0;
          }
          fields.created_at = moment().format("YYYY-MM-DD");
          let tagsArr = fields.tags.split(" ");

          let newTagsString = "";
          if (tagsArr.length > 0) {
            tagsArr.map((tag: string, i: number) => {
              if (i < 5) {
                newTagsString = newTagsString + " " + tag;
              }
            });
          }
          fields.tags = newTagsString;
          if (fields.title.length > 250) {
            fields.title = fields.title.substr(0, 250);
          }

          dispatch(createGoal(fields, redirect));
        }}
      >
        {({ errors, status, touched }) => (
          <Form>
            <div className="form-group">
              <Field
                name="title"
                type="text"
                className={errors.title && touched.title ? " is-invalid" : ""}
                placeholder="Укажите название цели (например похудеть к лету)"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <Field
                  as="textarea"
                  name="description"
                  type="text"
                  className={
                    errors.description && touched.description
                      ? " is-invalid"
                      : ""
                  }
                  placeholder="Укажите небольшое описание цели (например планинирую скинуть к лету 10кг)"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="form-group">
              <Field
                name="tags"
                type="text"
                placeholder="Можете указать теги к цели ( указываются через пробел не более 5 тегов )"
              />
              <ErrorMessage
                name="tags"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>
                <Field type="checkbox" name="done" />
                <span style={{ marginLeft: "10px" }}>Достигнутая цель ? </span>
              </label>
            </div>
            <div style={{ marginTop: "15px" }} className="form-group">
              <button type="submit" className="saveButton">
                Создать цель
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreateGoal;

/*
<div>
              Добавьте этапы цели
              <div>Например:</div>
              <div className={styles.exampleWrapp}>
                <div>
                  <img src={womanImage} alt="" />
                </div>
                <div>21-05-2021</div>
                <div>День первый вес 90кг</div>
              </div>
              <div className={styles.stagesWrapper}>
                {stages.map((stage: any, i: number) => (
                  <CreateStage
                    key={i}
                    iteration={i}
                    setFile={setFile}
                    setDate={setDate}
                    setDescription={setDescription}
                  />
                ))}

                <div className={styles.plusWrapper}>
                  <img
                    className={styles.plusIcon}
                    src={plusIcon}
                    onClick={addStage}
                    alt=""
                  />
                  <div>Добавить этап</div>
                </div>
              </div>
            </div>

*/
