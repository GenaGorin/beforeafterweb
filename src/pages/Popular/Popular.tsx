import MainPageSwitcher from "../../components/MainPageSwitcher/MainPageSwitcher";
import PopularGoalsList from "../../components/PopularGoalList/PopularGoalList";

function Popular() {
  return (
    <div>
      <MainPageSwitcher />
      <PopularGoalsList />
    </div>
  );
}

export default Popular;
