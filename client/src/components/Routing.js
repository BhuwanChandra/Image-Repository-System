import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { authenticateUser } from "../redux/actions";
import Home from './Home';
import Main from './Main';

const Routing = ({ authenticateUser }) => {
  const history = useHistory();
  useEffect(() => {
    let user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    let token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    if (user && token) {
      authenticateUser({ user, token });
      history.push("/dashboard");
    } else {
      history.push("/authenticate");
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/dashboard">
        <Home />
      </Route>
      <Route path="/authenticate">
        <Main />
      </Route>
    </Switch>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateUser: user => dispatch(authenticateUser(user))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Routing);
