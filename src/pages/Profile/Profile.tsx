import { useState } from "react";
import { useSelector } from "react-redux";
import Auth from "../../components/Auth/Auth";
import MyProfile from "../../components/MyProfile/MyProfile";
import Register from "../../components/Register/Register";

function Profile() {
  let id = useSelector((state: any) => state.user.user.id);
  const [auth, setAuth] = useState(true);

  return id ? (
    <MyProfile />
  ) : auth ? (
    <Auth setAuth={setAuth} />
  ) : (
    <Register setAuth={setAuth} />
  );
}

export default Profile;
