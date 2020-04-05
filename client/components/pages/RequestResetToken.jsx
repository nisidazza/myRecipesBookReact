import React from "react";
import { apiRequestResetToken } from "../../apis/resetPasswordApi";

class RequestResetToken extends React.Component {
  possibleOutcomes = {
    undefined: undefined,
    success: "success",
    error: "error"
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      outcome: this.possibleOutcomes.undefined
    };
  }

  componentDidMount() {
    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Recovery Email" }
    });
    document.dispatchEvent(event);
  }

  handleChange = e => {
    this.state[e.target.id] = e.target.value;
  };

  handleRecoveryEmailSubmit = e => {
    e.preventDefault();
    apiRequestResetToken(this.state.username).then(outcome => {
      console.log(outcome);
      this.setState({
        outcome: outcome.success
          ? this.possibleOutcomes.success
          : this.possibleOutcomes.error
      });
    });
  };

  render() {
    return (
      <div id="RequestResetToken-jsx-component">
        <form
          className="mx-auto"
          style={{ maxWidth: "500px", marginTop: "100px" }}
          onSubmit={this.handleRecoveryEmailSubmit}
        >
          <div className="text-center">
            <h4 className="psw-recovery">Forgot Password?</h4>
            <p>
              No worries! Just enter the email address you provided and we'll
              send you a reset password link.
            </p>
          </div>
          <div className="border mt-4" id="border-shadow">
            <div className="form-group row mx-2 my-3">
              <div className="input-container mx-auto col-sm">
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
            <div className="input-container mx-auto mt-3 mb-3 col-xs-3">
              {this.state.outcome !== this.possibleOutcomes.success ? (
                <input
                  value="Send Recovery Email"
                  type="submit"
                  className="btn btn-outline-success mx-auto"
                />
              ) : (
                ""
              )}
            </div>
            <div className="request-reset-token-msg">
              {this.state.outcome == this.possibleOutcomes.success ? (
                <p className='outcome'>
                  “An email has been sent to {this.state.username} with further
                  instructions.”
                </p>
              ) : this.state.outcome == this.possibleOutcomes.error ? (
                <p className='outcome'>"Sorry, something went wrong!"</p>
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

export default RequestResetToken;
