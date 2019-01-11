import React, { Component } from "react";
import axios from "axios";
import "./auth.css";
class AuthPage extends Component {
  state = {
    email: "",
    password: ""
  };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <form className="auth-form" onSubmit={this.handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleInput}
            value={this.state.email}
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleInput}
            value={this.state.password}
            type="password"
            id="password"
            name="password"
          />
        </div>
        <div className="form-action">
          <button type="submit">Submit</button>
          <button type="button">Switch to SignUp</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
