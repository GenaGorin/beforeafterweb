import { useEffect, useState } from "react";
import { IGoalTags } from "../../interfaces/goalTags";
import { ITag } from "../../interfaces/tag";
import { getTagsByName } from "../../redux/actions";
import Tag from "./Tag";
import styles from "./Tag.module.css";

type TTagsBlock = {
  goalTags: [IGoalTags];
};

function TagsBlock({ goalTags }: TTagsBlock) {
  let tagIds = goalTags.map((goalTag: IGoalTags) => goalTag.tag_id);
  const [tagNames, setTagNames] = useState<any>();

  useEffect(() => {
    getTagsByName(tagIds, setTagNames);
  }, []);

  return (
    <div className={styles.tagsWrapper}>
      {tagNames?.length > 0 &&
        tagNames.map((tag: ITag) => <Tag key={tag.id} tag={tag} />)}
    </div>
  );
}
export default TagsBlock;
