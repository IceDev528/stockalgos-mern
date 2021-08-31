import React, { Component } from "react";
import logo from "../assets/logo.png";
import AuthBackground from "../components/AuthBackground/AuthBackground";
import { NavLink } from "react-router-dom";
import axios from "axios";

class SignUpPage extends Component {
  state = {
    error: {},
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = e.target;
    if (
      confirmPassword.value === password.value &&
      password.value !== "" &&
      firstName.value !== "" &&
      lastName.value !== "" &&
      email.value !== ""
    ) {
      axios
        .post("/create_user", {
          name: `${firstName.value} ${lastName.value}`,
          firstName: firstName.value,
          lastName: lastName.value,
          password: password.value,
          email: email.value,
        })
        .then((response) => {
          console.log(response);
          this.props.history.push("/login");
        });
    } else {
      this.checkError(e);
    }
  };

  checkError = (e) => {
    const { firstName, lastName, email, password, confirmPassword } = e.target;
    const { error } = this.state;
    if (firstName.value === "") {
      error.firstName = "Please enter first Name";
    } else {
      error.firstName = "";
    }

    if (lastName.value === "") {
      error.lastName = "Please enter last Name";
    } else {
      error.lastName = "";
    }

    if (!email.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      error.email = "Please enter valid email address";
    } else {
      error.email = "";
    }

    if (password.value === "") {
      error.password = "Password is required";
    } else {
      error.password = "";
    }

    if (confirmPassword.value === "") {
      error.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword.value !== password.value) {
      error.confirmPassword = "Confirm password not matched";
    } else {
      error.confirmPassword = "";
    }
    this.setState({ error });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="__auth-Page __flex-stretch">
        <div className="__auth-wrapper">
          <img src={logo} alt="" className="__logo __mb-4" />
          <div className="__mb-2">
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup" className="__ml-1">
              Sign Up
            </NavLink>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="__flex __mtb--1">
              <div className="__input-field __mr-1 no-brdr">
                <input
                  name="firstName"
                  placeholder="First Name"
                  className="__input-field __mr-1"
                />
                {error.firstName != "" && <span> {error.firstName} </span>}
              </div>
              <div className="__input-field  no-brdr">
                <input
                  name="lastName"
                  placeholder="Last Name"
                  className="__input-field"
                />
                {error.lastName != "" && <span> {error.lastName} </span>}
              </div>
            </div>
            <input
              name="email"
              type="email"
              className="__input-field"
              placeholder="Email/Username"
            />
            {error.email != "" && <span> {error.email} </span>}
            {/* <input name='username' type='text' readOnly className='__input-field' placeholder='Create a username' /> */}
            <input
              type="password"
              name="password"
              type="text"
              className="__input-field"
              placeholder="Create a password"
            />
            {error.password != "" && <span> {error.password} </span>}
            <input
              name="confirmPassword"
              type="password"
              className="__input-field"
              placeholder="Re-enter a password"
            />
            {error.confirmPassword != "" && (
              <span> {error.confirmPassword} </span>
            )}
            <button className="__btn __mt-3">Sign Up</button>
          </form>
        </div>
        <AuthBackground />
      </div>
    );
  }
}

export default SignUpPage;
