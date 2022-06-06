import FinishedGoalList from "../../components/FinishedGoalList/FinishedGoalList";
import MainPageSwitcher from "../../components/MainPageSwitcher/MainPageSwitcher";

function Finished() {
  return (
    <div>
      <MainPageSwitcher />
      <FinishedGoalList />
    </div>
  );
}

export default Finished;
