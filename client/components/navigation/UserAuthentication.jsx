import React from "react";
import { Link } from "react-router-dom";
import { IfAuthenticated, IfNotAuthenticated } from "../common/utilities/Authenticated";
import { logOff, getDecodedToken } from "authenticare/client";

class UserAuthentication extends React.Component {
  constructor(props) {
    super(props);
  }

  getUserName = () => {
    let myToken = getDecodedToken();
    if (myToken) {
      return myToken.username;
    } else {
      return "";
    }
  };

  handleLogOff = () => {
    logOff();
    let logOffEvent = new Event('logOff')
    document.dispatchEvent(logOffEvent)
  };



  render() {
    return (
      <>
        <IfAuthenticated>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item p-2 mt-2">
                <h5 className="nav-item">Welcome, {this.getUserName()}!</h5>
              </li>
              <li className="nav-item p-0 mt-2">
                <Link to="#" className="nav-link" onClick={this.handleLogOff}>
                  Log Off
                </Link>
              </li>
            </ul>
          </div>
        </IfAuthenticated>

        <ul className="navbar-nav ml-auto">
          <IfNotAuthenticated>
            <div className="d-flex p-2">
              <li className="nav-item w-100 pl-2">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item w-100 pl-2">
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              </li>
            </div>
          </IfNotAuthenticated>
        </ul>
      </>
    );
  }
}

export default UserAuthentication;
