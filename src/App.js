import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SecureRoute, Security, LoginCallback } from "@okta/okta-react";

// Styles
import "./App.css";

// Components
import Navbar from "./components/Common/Navbar";
import { LoginPage } from "./components/LoginPage/loginPage";
import ViewAllSchedule from "./components/ViewAllSchedule";
import LocationList from "./components/LocationList";
import ManageLocation from "./components/ManageLocation";
import LocationDetails from "./components/LocationDetails";
import { PrivateRoute } from "./HOC/privateRoute";

function App() {
  return (
    <Router>
      <div>
        <Security
          issuer={`${process.env.REACT_APP_OKTA_BASE_URL}/oauth2/default`}
          clientId={process.env.REACT_APP_OKTA_CLIENT_ID}
          redirectUri={window.location.origin + "/implicit/callback"}
          postLogoutRedirectUri={window.location.origin}
        >
          <Navbar />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/implicit/callback" component={LoginCallback} />
            <PrivateRoute path="/landingPage" exact component={LocationList} />
            <PrivateRoute
              path="/location-details/:id"
              exact
              component={LocationDetails}
            />
            <PrivateRoute
              path="/location/manage"
              exact
              component={ManageLocation}
            />
            <PrivateRoute
              path="/schedule/all"
              exact
              component={ViewAllSchedule}
            />
          </Switch>
        </Security>
      </div>
    </Router>
  );
}

export default App;
