import { NavLink } from "react-router-dom";
import { ITag } from "../../interfaces/tag";
import styles from "./Tag.module.css";

type TTag = {
  tag: ITag;
};

function Tag({ tag }: TTag) {
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
}

export default Tag;
