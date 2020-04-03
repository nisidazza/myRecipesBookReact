import React from "react";


class RecoveryEmail extends React.Component {
  constructor(props) {
    super(props);

    this.recoveryEmail = {
      username: ""
    }

  }

  componentDidMount() {
    let event = new CustomEvent("pageHasChanged", {
      detail: { pageTitle: "Recovery Email" }
    });
    document.dispatchEvent(event);
  }

  handleChange = e => {
    this.recoveryEmail[e.target.id] = e.target.value;
    console.log(this.recoveryEmail[e.target.id])
  };

  handleRecoveryEmailSubmit = (e) => {
    e.preventDefault();

  }

  render() {
    return (
      <div id="RecoveryEmail-jsx-component">
        <form className="mx-auto" style={{ maxWidth: "500px", marginTop: "100px" }}
        onSubmit={this.handleRecoveryEmailSubmit}>
          <div className="text-center">
            <h4>Forgot Password?</h4>
            <p>
              No worries! Just enter your email address and we'll send you a
              reset password link.
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
              <input
                value="Send Recovery Email"
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

export default RecoveryEmail;
