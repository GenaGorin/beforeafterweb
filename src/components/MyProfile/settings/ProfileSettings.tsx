import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Logout, updateUserData } from "../../../redux/actions";
import styles from "../MyProfile.module.css";

function ProfileSettings() {
  const dispatch = useDispatch();
  const me = useSelector((state: any) => state.user.user);

  return (
    <div>
      <div className={styles.dataWrapper}>
        <div style={{ marginBottom: "10px" }}>email: {me?.email}</div>
        <Formik
          initialValues={{
            firstname: me?.firstname,
            lastname: me?.lastname,
            description: me?.description,
            vk: me?.vk,
            instagram: me?.instagram,
            telegram: me?.telegram,
            whatsapp: me?.whatsapp,
          }}
          onSubmit={(fields) => {
            //console.log(fields);
            dispatch(updateUserData(fields));
          }}
        >
          {({ errors, status, touched }) => (
            <Form>
              <div className="form-row">
                <div className="form-group col">
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
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <Field
                    name="lastname"
                    type="text"
                    className={
                      errors.lastname && touched.lastname ? " is-invalid" : ""
                    }
                    placeholder="Фамилия"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <Field
                    name="description"
                    as="textarea"
                    type="text"
                    className={
                      errors.description && touched.description
                        ? " is-invalid"
                        : ""
                    }
                    placeholder="Описание профиля"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <Field
                    name="vk"
                    type="text"
                    className={errors.vk && touched.vk ? " is-invalid" : ""}
                    placeholder="VK"
                  />
                  <ErrorMessage
                    name="vk"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <Field
                    name="instagram"
                    type="text"
                    className={
                      errors.instagram && touched.instagram ? " is-invalid" : ""
                    }
                    placeholder="Instagram"
                  />
                  <ErrorMessage
                    name="instagram"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <Field
                    name="telegram"
                    type="text"
                    className={
                      errors.telegram && touched.telegram ? " is-invalid" : ""
                    }
                    placeholder="Telegram"
                  />
                  <ErrorMessage
                    name="telegram"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <Field
                    name="whatsapp"
                    type="text"
                    className={
                      errors.whatsapp && touched.whatsapp ? " is-invalid" : ""
                    }
                    placeholder="WhatsApp"
                  />
                  <ErrorMessage
                    name="whatsapp"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
              </div>
              <div style={{ marginTop: "15px" }} className="form-group">
                <button type="submit" className="saveButton">
                  Сохранить
                </button>
                <div className={styles.logoutWrapper}>
                  <button
                    onClick={() => dispatch(Logout())}
                    className="logoutBtn"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ProfileSettings;
