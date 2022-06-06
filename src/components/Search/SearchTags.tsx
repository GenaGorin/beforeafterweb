import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ITag } from "../../interfaces/tag";
import { searchTags } from "../../redux/actions";
import styles from "./Styles.module.css";

function SearchTags() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const find = (text: string) => {
    if (text.length > 3) {
      searchTags(text, setResult);
    } else {
      setResult([]);
    }
    setSearch(text);
  };

  return (
    <div>
      <div>Поиск по тегам:</div>
      <div>
        <input
          value={search}
          onChange={(e) => find(e.target.value)}
          type="text"
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        {result.length > 0 ? (
          result.map((tag: ITag) => <Tag key={tag.id} tag={tag} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchTags;

type TTag = {
  tag: ITag;
};

const Tag = ({ tag }: TTag) => {
  let color =
    "#" + (Math.random().toString(16) + "000000").substring(2, 8).toUpperCase();
  return (
    <NavLink
      to={"/tags/" + tag.id}
      style={{ backgroundColor: color }}
      className={styles.tag}
    >
      {tag.text}
    </NavLink>
  );
};
