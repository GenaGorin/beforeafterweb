import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { signup } from "../../redux/actions";
import Alert from "../Alert/Alert";
import styles from "../Auth/Auth.module.css";

type TRegister = {
  setAuth: any;
};

function Register({ setAuth }: TRegister) {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.app.alert);

  return (
    <div className={styles.mainWrapp}>
      <div className={styles.title}>Регистрация</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          password_repeat: "",
          firstname: "",
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().required("Укажите имя"),
          email: Yup.string()
            .email("Некорректный email")
            .required("Укажите email"),
          password: Yup.string()
            .min(4, "Пароль должен быть более 4 символов")
            .required("Укажите пароль"),
          password_repeat: Yup.string()
            .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
            .required("Повторите пароль"),
        })}
        onSubmit={(fields) => {
          dispatch(signup(fields));
        }}
      >
        {({ errors, status, touched }) => (
          <Form>
            <div className="form-group">
              <Field
                name="firstname"
                type="text"
                className={
                  errors.firstname && touched.firstname ? " is-invalid" : ""
                }
                placeholder="Имя"
              />
              <ErrorMessage
                name="firstname"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <Field
                name="email"
                type="text"
                className={errors.email && touched.email ? " is-invalid" : ""}
                placeholder="email"
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
            <div className="form-group">
              <Field
                name="password_repeat"
                type="password"
                className={
                  errors.password_repeat && touched.password_repeat
                    ? " is-invalid"
                    : ""
                }
                placeholder="Повторите пароль"
              />
              <ErrorMessage
                name="password_repeat"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div style={{ marginTop: "15px" }} className="form-group">
              <button type="submit" className="saveButton">
                Зарегистрироваться
              </button>
              <button
                style={{ marginLeft: "15px" }}
                className="logoutBtn"
                onClick={() => setAuth(true)}
              >
                Авторизация
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <br />
      {alert && <Alert text={alert} />}
    </div>
  );
}

export default Register;
