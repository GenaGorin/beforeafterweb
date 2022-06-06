import GoalComponent from "../../components/Goal/Goal";
import GoBack from "../../components/GoBack/GoBack";

function Goal({ match }: any) {
  let goalId = Number(match.params.goalId);
  return (
    <div>
      <GoBack />
      <GoalComponent goalId={goalId} />
    </div>
  );
}

export default Goal;
