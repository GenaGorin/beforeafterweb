import { useState } from "react";
import SearchGoals from "../../components/Search/SearchGoals";
import SearchTags from "../../components/Search/SearchTags";
import SearchUsers from "../../components/Search/SearchUsers";
import styles from "./Search.module.css";

function Search() {
  const [searchFor, setSearchFor] = useState("goals");
  return (
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
      Поиск по:
      <div className={styles.switchBtnsWrapper} style={{ marginLeft: 0 }}>
        <div
          className={searchFor === "goals" ? styles.btnActive : ""}
          onClick={() => setSearchFor("goals")}
        >
          По целям
        </div>

        <div
          className={searchFor === "tags" ? styles.btnActive : ""}
          onClick={() => setSearchFor("tags")}
        >
          По тегам
        </div>
      </div>
      <div>
        {searchFor === "goals" ? <SearchGoals /> : <></>}
        {searchFor === "tags" ? <SearchTags /> : <></>}
      </div>
    </div>
  );
}

export default Search;
