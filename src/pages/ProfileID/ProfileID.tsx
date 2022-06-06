import GoBack from "../../components/GoBack/GoBack";
import Profile from "../../components/Profile/Profile";

function ProfileID({ match }: any) {
  let userId = Number(match.params.userId);
  return (
    <div>
      <GoBack />
      <Profile userId={userId} />
    </div>
  );
}

export default ProfileID;
