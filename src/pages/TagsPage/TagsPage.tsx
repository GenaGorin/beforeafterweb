import TagGoalList from "../../components/TagGoalList/TagGoalList";

function TagsPage({ match }: any) {
  let tagId = Number(match.params.tagId);
  return <TagGoalList tagId={tagId} />;
}

export default TagsPage;
