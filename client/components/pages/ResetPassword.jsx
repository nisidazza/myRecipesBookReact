import React from "react";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="ResetPassword-jsx-component">
        <form className="mx-auto" style={{ maxWidth: "500px", margin: "auto" }}>
          <div className="text-center mt-5">
            <h4>Forgot Password?</h4>
            <p>You can reset your password using this form!</p>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetPassword;
