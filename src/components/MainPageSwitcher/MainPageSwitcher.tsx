import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainPageSwitcher.module.css";

function MainPageSwitcher() {
  return (
    <div className={styles.switchBtnsWrapper}>
      <NavLink
        to="/main"
        className={
          window.location.pathname === "/main"
            ? styles.btnActive
            : styles.btnNotActive
        }
      >
        Свежее
      </NavLink>
      <NavLink
        to="/popular"
        className={
          window.location.pathname === "/popular"
            ? styles.btnActive
            : styles.btnNotActive
        }
      >
        Популярное
      </NavLink>
      <NavLink
        to="/subs"
        className={
          window.location.pathname === "/subs"
            ? styles.btnActive
            : styles.btnNotActive
        }
      >
        Подписки
      </NavLink>
      <NavLink
        to="/finished"
        className={
          window.location.pathname === "/finished"
            ? styles.btnActive
            : styles.btnNotActive
        }
      >
        Завершенные
      </NavLink>
    </div>
  );
}

export default MainPageSwitcher;
