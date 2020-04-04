import React from "react";
import {Redirect} from 'react-router'
import { apiResetPassword } from "../../apis/resetPasswordApi";

class ResetPassword extends React.Component {
  possibleOutcomes = {
    undefined: undefined,
    success: "success",
    error: "error"
  };

  constructor(props) {
    super(props);

    const params = new URLSearchParams(this.props.location.search);
    const token = params.get("token");

    this.state = {
      token: token,
      password: "",
      confirmPsw: "",
      outcome: this.possibleOutcomes.undefined
    };
  }

  componentDidMount() {
    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Reset Password" }
    });
    document.dispatchEvent(event);
  }

  handleChange = e => {
    this.state[e.target.id] = e.target.value;
  };

  handleResetPasswordSubmit = e => {
    e.preventDefault();
    apiResetPassword(
      this.state.token,
      this.state.password,
      this.state.confirmPsw
    ).then(outcome => {
      this.setState({
        outcome: outcome.success
          ? this.possibleOutcomes.success
          : this.possibleOutcomes.error
      });
    });
  };

  render() {
    return (
      <div id="ResetPassword-jsx-component">
        <form
          className="mx-auto"
          style={{ maxWidth: "500px", marginTop: "50px" }}
          onSubmit={this.handleResetPasswordSubmit}
        >
          <div className="text-center mt-5">
            <h4>Reset Password</h4>
            <p>You can reset your password using this form!</p>
          </div>
          <div className="border mt-4" id="border-shadow">
            <div className="form-group row mb-0 mx-2 mt-3">
              <div className="input-container mx-auto col-sm">
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
            <div className="form-group row mx-2 mb-3">
              <div className="input-container mx-auto col-sm">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPsw"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="input-container mx-auto mt-3 mb-3 col-xs-3">
              <input
                value="Confirm Reset Password"
                type="submit"
                className="btn btn-outline-success mx-auto"
              />
            </div>
            <div>
              {this.state.outcome == this.possibleOutcomes.success ? (
                <Redirect to="/signin" />
              ) : this.state.outcome == this.possibleOutcomes.error ? (
                <p className='outcome'>Sorry, something went wrong!</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
