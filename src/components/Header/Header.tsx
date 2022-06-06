import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const [page, setPage] = useState(window.location.pathname);

  useEffect(() => {
    setPage("/main");
  }, []);

  return (
    <div>
      <div className={styles.headerWrapper}>
        <div className={styles.pagesWrapper}>
          <div>
            <NavLink to="/main" onClick={() => setPage("/main")}>
              <div
                className={page === "/main" ? styles.active : styles.notActive}
              >
                <div>Все цели</div>
              </div>
            </NavLink>
          </div>

          <div>
            <NavLink to="/createGoal" onClick={() => setPage("/createGoal")}>
              <div
                className={
                  page === "/createGoal" ? styles.active : styles.notActive
                }
              >
                <div>Создать цель</div>
              </div>
            </NavLink>
          </div>
          <div>
            <NavLink to="/myProfile" onClick={() => setPage("/myProfile")}>
              <div
                className={
                  page === "/myProfile" ? styles.active : styles.notActive
                }
              >
                <div>Мой профиль</div>
              </div>
            </NavLink>
          </div>
          <div>
            <NavLink to="/contacts" onClick={() => setPage("/contacts")}>
              <div
                className={
                  page === "/contacts" ? styles.active : styles.notActive
                }
              >
                <div>Контакты</div>
              </div>
            </NavLink>
          </div>
          <div>
            <NavLink to="/search" onClick={() => setPage("/search")}>
              <div
                className={
                  page === "/search" ? styles.active : styles.notActive
                }
              >
                <div>Поиск</div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
