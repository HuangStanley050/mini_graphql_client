import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

const Navigation = props => {
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
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Auth</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
