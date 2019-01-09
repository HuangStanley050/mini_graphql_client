import React, { Component } from "react";
import logo from "./logo.svg";
import { Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./components/auth";
import BookingPage from "./components/bookings";
import EventPage from "./components/events";
import Navigation from "./components/navigation/navigation";
import "./App.css";
class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <main className="main-content">
          <Switch>
            <Redirect exact from="/" to="/auth" />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventPage} />
            <Route path="/bookings" component={BookingPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
