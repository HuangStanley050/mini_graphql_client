import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./components/auth";
import BookingPage from "./components/bookings";
import EventPage from "./components/events";
import Navigation from "./components/navigation/navigation";
import AuthContext from "./context/auth-context";
import "./App.css";
class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <div>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <Navigation />
          <main className="main-content">
            <Switch>
              {!this.state.token ? (
                <Redirect exact from="/" to="/auth" />
              ) : null}
              {this.state.token ? (
                <Redirect exact from="/" to="/events" />
              ) : null}
              {this.state.token ? (
                <Redirect exact from="/auth" to="/events" />
              ) : null}
              {!this.state.token ? (
                <Route path="/auth" component={AuthPage} />
              ) : null}
              <Route path="/events" component={EventPage} />
              {this.state.token ? (
                <Route path="/bookings" component={BookingPage} />
              ) : null}
            </Switch>
          </main>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
