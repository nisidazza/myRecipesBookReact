import React from "react";
import { Link } from "react-router-dom";
import { logOff, getDecodedToken } from "authenticare/client";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

class Nav extends React.Component {
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
    this.props.history.push("/");
  };

  render() {
    return (
      <div id="Nav-jsx-component">
        <div
          className="jumbotron-fluid text-center"
          style={{ marginBottom: "0" }}
        >
          <h1 className="display-4 " id="title">
            My Recipe Book
          </h1>
          <h4 id="statement">Keep track of your favourite recipes!</h4>
        </div>
        <nav className="navbar fixed navbar-expand-sm">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/homepage">
                  Homepage
                </Link>
              </li>
            </ul>
          </div>

          <IfAuthenticated>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
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
        </nav>
        <nav className="navbar sidenav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link not-active" to="#">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/listrecipes/">
                Recipes List
              </Link>
            </li>
            <IfAuthenticated>
              <li className="nav-item">
                <Link className="nav-link" to="/addrecipe">
                  Add Recipe
                </Link>
              </li>
            </IfAuthenticated>
            <IfNotAuthenticated></IfNotAuthenticated>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
