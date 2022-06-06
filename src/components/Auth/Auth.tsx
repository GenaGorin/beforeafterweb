import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../../redux/actions";
import Alert from "../Alert/Alert";
import Loader from "../Loader/Loader";
import styles from "./Auth.module.css";

type TAuth = {
  setAuth: any;
};

function Auth({ setAuth }: TAuth) {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.app.loading);
  const alert = useSelector((state: any) => state.app.alert);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.mainWrapp}>
      <div className={styles.title}>Авторизация</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Некорректный email")
            .required("Укажите email"),
          password: Yup.string()
            .min(4, "Пароль должен быть более 4 символов")
            .required("Укажите пароль"),
        })}
        onSubmit={(fields) => {
          //console.log(fields);
          dispatch(login(fields));
        }}
      >
        {({ errors, status, touched }) => (
          <Form>
            <div className="form-group">
              <Field
                name="email"
                type="text"
                className={errors.email && touched.email ? " is-invalid" : ""}
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <Field
                  name="password"
                  type="password"
                  className={
                    errors.password && touched.password ? " is-invalid" : ""
                  }
                  placeholder="Пароль"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div style={{ marginTop: "15px" }} className="form-group">
              <button type="submit" className="saveButton">
                Войти
              </button>
              <button
                style={{ marginLeft: "15px" }}
                className="logoutBtn"
                onClick={() => setAuth(false)}
              >
                Регистрация
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {alert && <Alert text={alert} />}
    </div>
  );
}

export default Auth;
