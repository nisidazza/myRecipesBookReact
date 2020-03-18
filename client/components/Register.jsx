import React from "react";
import { register, isAuthenticated } from "authenticare/client";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.loginData = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Register" }
    });
    document.dispatchEvent(event);
  }

  handleChange = e => {
    this.loginData[e.target.id] = e.target.value;
  };

  handleClick = () => {
    register(this.loginData, {
      baseUrl: process.env.PUBLIC_BASE_API_URL // see .env and webpack.config.js
    }).then(token => {
      if (isAuthenticated()) {
        this.props.history.push("/listrecipes");
      }
    });
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
              <button
                className="btn btn-outline-success mx-auto"
                onClick={this.handleClick}
              >
                Register
              </button>
            </div>
          </div>
          {/* TO DO: add confirm password field */}
        </form>
      </div>
    );
  }
}

export default Register;
