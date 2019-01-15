import React from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import "./navigation.css";

const Navigation = props => {
  return (
    <AuthContext.Consumer>
      {context => {
        return (
          <header className="main-navigation">
            <div className="main-navigation__logo">
              <h1>Easy Event</h1>
            </div>
            <nav className="main-navigation__items">
              <ul>
                <li>
                  <NavLink to="/events">Events</NavLink>
                </li>
                {context.token ? (
                  <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                  </li>
                ) : null}
                {!context.token ? (
                  <li>
                    <NavLink to="/auth">Auth</NavLink>
                  </li>
                ) : null}
              </ul>
            </nav>
          </header>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
