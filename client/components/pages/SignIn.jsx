import React from "react";
import { signIn, isAuthenticated } from "authenticare/client";
import Validator from "../common/utilities/Validator";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.loginData = {
      username: "",
      password: ""
    };

    this.validator = React.createRef();
  }

  componentDidMount() {
    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Sign-In" }
    });
    document.dispatchEvent(event);
  }

  handleChange = e => {
    this.loginData[e.target.id] = e.target.value;
  };

  handleSubmit = e => {
    e.preventDefault();
    signIn(this.loginData, {
      baseUrl: process.env.PUBLIC_BASE_API_URL // see .env and webpack.config.js
    })
      .then(token => {
        if (isAuthenticated()) {
          this.props.history.push("/listrecipes");
        }
      })
      .catch(error => {
        if (
          error &&
          error.response &&
          error.response.body &&
          error.response.body.errorType == "INVALID_CREDENTIALS"
        ) {
          this.validator.current.showError(
            "Sorry, wrong username + password combination!"
          );
        } else {
          this.validator.current.showError(
            "Something went wrong. Please,try again!"
          );
          throw error;
        }
      });
  };

  render() {
    return (
      <div id="SignIn-jsx-component">
        <form
          className="mx-auto"
          style={{ maxWidth: "500px", margin: "auto" }}
          onSubmit={this.handleSubmit}
        >
          <h4 className="text-center mt-5">Sign-In Form </h4>
          <div className="border mt-4" id="border-shadow">
            <div className="form-group row m-2 mt-4">
              <div className="input-container mx-auto mt-3 col-xs-4">
                <i className="fa fa-user icon" />
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Email address"
                  autoComplete="off"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="form-group row m-2">
              <div className="input-container mx-auto col-xs-4">
                <i className="fa fa-key icon"></i>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="input-container mx-auto mb-3 col-xs-3">
              <input
                value="Sign In"
                type="submit"
                className="btn btn-outline-success mx-auto"
              />
            </div>
            <div>
              <Validator ref={this.validator} />
            </div>
            <div className="forgot-psw">
              <a href="#/recovery/email/" target="_blank">Forgot your Password?</a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
