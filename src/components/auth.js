import React, { Component } from "react";
import axios from "axios";
import "./auth.css";
class AuthPage extends Component {
  state = {
    email: "",
    password: "",
    isLogin: true
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    //if islogin is true ---->login
    //if islogin is false --->create user
    let queryBody = {
      query: `
         query {
           login(email:"${this.state.email}",password:"${
        this.state.password
      }") {
             userId
             token
             tokenExpiration
           }
         }
      `
    };

    if (!this.state.isLogin) {
      queryBody = {
        query: `
         mutation {
           createUser(userInput:{email:"${this.state.email}",password:"${
          this.state.password
        }"}) {
        _id
        email
      }
         }
      `
      };
    }

    axios
      .post(
        "https://github-site-practice-infamousgodhand.c9users.io:8081/graphql",
        queryBody
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
          <button
            onClick={() =>
              this.setState(prevState => {
                return { isLogin: !prevState.isLogin };
              })
            }
            type="button"
          >
            Switch to {this.state.isLogin ? "SignUp" : "Login"}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
