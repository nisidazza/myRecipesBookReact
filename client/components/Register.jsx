import React from "react";
import { register, isAuthenticated } from "authenticare/client";
import Validator from "./Validator";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginData: {
        username: "",
        password: "",
        email: ""
      },
      confirmPassword: "",
      errorMessage: [],
      isValid: true
    };

    this.validator = React.createRef();
  }

  componentDidMount() {
    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Register" }
    });
    document.dispatchEvent(event);
  }

  handleLoginData = e => {
    this.state.loginData[e.target.id] = e.target.value;
  };

  handlePasswordConfirmation = e => {
    this.setState({
      confirmPassword: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    if (this.validator.current.validate()) {
      register(this.state.loginData, {
        baseUrl: process.env.PUBLIC_BASE_API_URL // see .env and webpack.config.js
      }).then(token => {
        if (isAuthenticated()) {
          this.props.history.push("/listrecipes");
        }
      });
    }
  };

  getValidationRules = () => {
    let rules = [];

    rules.push({
      conditional: () => {
        return this.state.loginData.username !== "" 
      },
      errorMessage: "Please choose a username"
    });

    rules.push({
      conditional: () => {
        return (
          this.state.loginData.password.match(/[a-z]/g) &&
          this.state.loginData.password.match(/[A-Z]/g) &&
          this.state.loginData.password.match(/[0-9]/g) &&
          this.state.loginData.password.match(/[^a-zA-Z\d]/g) &&
          this.state.loginData.password.length >= 8
        );
      },
      errorMessage:
        "A valid password must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 digit, at least 1 special character and minimum 8 characters"
    });

    rules.push({
      conditional: () => {
        return this.state.confirmPassword == this.state.loginData.password;
      },
      errorMessage: "Password and Confirm Password do not match"
    });

    rules.push({
      conditional: () => {
        return this.state.loginData.email !== "" && this.state.loginData.email.match(/\S+@\S+\.\S+/);
      },
      errorMessage: "Please insert a valid email address"
    });

    return rules;
  };

  render() {
    return (
      <div id="Register-jsx-component">
        <form className="mx-auto" style={{ maxWidth: "500px", margin: "auto" }}>
          <h4 className="text-center mt-5">Register Form</h4>
          <div className="border mt-4" id="border-shadow">
            <div className="form-group row m-2 mt-4 col-xs-3">
              <div className="input-container mx-auto mt-3 col-xs-3">
                <i className="fa fa-user icon" />
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                  onChange={this.handleLoginData}
                ></input>
              </div>
            </div>
            <div className="form-group row m-2">
              <div className="input-container mx-auto col-xs-3">
                <i className="fa fa-key icon"></i>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={this.handleLoginData}
                ></input>
              </div>
            </div>
            <div className="form-group row m-2">
              <div className="input-container mx-auto col-xs-3">
                <i className="fa fa-key icon"></i>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  onChange={this.handlePasswordConfirmation}
                ></input>
              </div>
            </div>
            <div className="form-group row m-2">
              <div className="input-container mx-auto col-xs-3">
                <i className="fa fa-envelope icon" />
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={this.handleLoginData}
                ></input>
              </div>
            </div>
            <div className="input-container mx-auto mb-4 col-xs-3">
              <input
                value="Register"
                type="submit"
                className="btn btn-outline-success mx-auto"
                onClick={this.handleClick}
              ></input>
            </div>
            <div>
              <Validator rules={this.getValidationRules()} ref={this.validator} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
