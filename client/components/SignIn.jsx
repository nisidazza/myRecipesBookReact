import React from "react";
import { signIn, isAuthenticated } from "authenticare/client";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.loginData = {
      username: "",
      password: ""
    };
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
    }).then(token => {
      if (isAuthenticated()) {
        this.props.history.push("/listrecipes");
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
            <div className="form-group row m-2 mt-4 col-xs-3">
              <div className="input-container mx-auto mt-3 col-xs-3">
                <i className="fa fa-user icon" />
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  autoComplete="off"
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="input-container mx-auto mb-4 col-xs-3">
              <input
                value="Sign In"
                type="submit"
                className="btn btn-outline-success mx-auto"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
