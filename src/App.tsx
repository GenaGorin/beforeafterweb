import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./api/api";
import { checkVersion, getUserData, showAlert } from "./redux/actions";
import CreateGoal from "./pages/CreateGoal/CreateGoal";
import CreateStage from "./pages/CreateStage/CreateStage";
import { useEffect, useState } from "react";
import Goal from "./pages/Goal/Goal";
import ProfileID from "./pages/ProfileID/ProfileID";
import Loader from "./components/Loader/Loader";
import TagsPage from "./pages/TagsPage/TagsPage";
import Popular from "./pages/Popular/Popular";
import Subs from "./pages/Subs/Subs";
import Finished from "./pages/Finished/Finished";
import Contacts from "./pages/Contacts/Contacts";
import Search from "./pages/Search/Search";
import BannedPage from "./pages/BannedPage/BannedPage";
import Donate from "./pages/Donate/Donate";

function App() {
  let token = useSelector((state: any) => state.user.user.access_token);
  let isBanned = useSelector((state: any) => state.user.user.is_banned);
  const dispatch = useDispatch();

  const CLIENT_VERSION = "1.0";

  const [loaded, setLoaded] = useState(false);
  const [currentVersion, setCurrentVersion] = useState<any>();

  useEffect(() => {
    if (token) {
      setToken(token);
      dispatch(getUserData());
      setLoaded(true);
    } else {
      setLoaded(true);
    }
    checkVersion(setCurrentVersion);
  }, [token]);

  if (currentVersion) {
    if (currentVersion?.app_version !== CLIENT_VERSION) {
      return <div>Please update client</div>;
    }
  }

  return (
    <BrowserRouter>
      {loaded ? (
        isBanned ? (
          <BannedPage />
        ) : (
          <div>
            <Header />
            <div className="app-container-wrapper">
              <div className="app-container">
                <div style={{ height: "100px" }}></div>
                <div>
                  <Switch>
                    <Redirect exact from="/" to="/main" />
                    <Route path="/main" render={() => <Main />} />
                    <Route path="/popular" render={() => <Popular />} />
                    <Route path="/subs" render={() => <Subs />} />
                    <Route path="/finished" render={() => <Finished />} />
                    <Route
                      path="/subscriptions"
                      render={() => <div>subscriptions component</div>}
                    />
                    <Route path="/createGoal" render={() => <CreateGoal />} />
                    <Route
                      path="/createstage/:goalId?"
                      component={CreateStage}
                    />
                    <Route path="/myProfile" render={() => <Profile />} />
                    <Route path="/contacts" render={() => <Contacts />} />
                    <Route path="/goal/:goalId?" component={Goal} />
                    <Route path="/profile/:userId?" component={ProfileID} />
                    <Route path="/tags/:tagId?" component={TagsPage} />
                    <Route path="/search" component={Search} />
                    <Route path="/Donate" component={Donate} />
                    <Route
                      path="*"
                      render={() => (
                        <div>
                          <h2>404 NOT FOUND</h2>
                        </div>
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <Loader />
      )}
    </BrowserRouter>
  );
}

export default App;

// <Redirect exact from="/" to="/" />
