import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AllBanks from "./pages/AllBanks";
import BankDetails from "./pages/BankDetails";
import Favorites from "./pages/Favorites";
import getBanksFromAPI from "./getBanks";
import updateFav from "./actFunctions/updateFav";
import "./css/styles.css";
import NotFound from "./pages/NotFound";

function App() {
  const searchParams = useSelector((state) => state.searchParams);
  const dispatch = useDispatch();

// get data from api whenever city is changed
  useEffect(() => {
    getBanksFromAPI();
  }, [searchParams.city]);

  // loading from localstorage to redux store
  useEffect(() => {
    const myStorage = window.localStorage;
    const localfavorites = JSON.parse(myStorage.getItem("favorites"));

    if (localfavorites === null) {
      myStorage.setItem("favorites", JSON.stringify([]));
    } else {
      dispatch(updateFav(localfavorites));
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/all-banks">
              <AllBanks />
            </Route>
            <Route exact path="/bank-details/:id">
              <BankDetails />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/all-banks" />;
              }}
            />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
