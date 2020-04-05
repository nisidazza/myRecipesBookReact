import React from "react";
import { Redirect } from "react-router";
import { apiResetPassword } from "../../apis/resetPasswordApi";
import Validator from "../common/utilities/Validator";

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

    this.validator = React.createRef();
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
    if (this.validator.current.validate()) {
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
    }
  };

  getValidationRules = () => {
    let rules = [];

    rules.push({
      conditional: () => {
        return (
          this.state.password.match(/[a-z]/g) &&
          this.state.password.match(/[A-Z]/g) &&
          this.state.password.match(/[0-9]/g) &&
          this.state.password.match(/[^a-zA-Z\d]/g) &&
          this.state.password.length >= 8
        );
      },
      errorMessage:
        "A valid password must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 digit, at least 1 special character and minimum 8 characters"
    });

    rules.push({
      conditional: () => {
        return this.state.confirmPsw == this.state.password;
      },
      errorMessage: "Password and Confirm Password do not match"
    });

    return rules;
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
              <Validator
                rules={this.getValidationRules()}
                ref={this.validator}
              />
            </div>
            <div>
              {this.state.outcome == this.possibleOutcomes.success ? (
                <Redirect to="/signin" />
              ) : this.state.outcome == this.possibleOutcomes.error ? (
                <p className="outcome">Sorry, something went wrong! Please, try again.</p>
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
