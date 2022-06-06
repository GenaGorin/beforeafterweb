import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import CreateGoal from "../../components/CreateGoal/CreateGoal";

function CreateGoalPage() {
  let id = useSelector((state: any) => state.user.user.id);

  const history = useHistory();

  if (!id) {
    history.push("/myProfile");
  }

  return (
    <div>
      <CreateGoal />
    </div>
  );
}

export default CreateGoalPage;
