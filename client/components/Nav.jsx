import React from "react";
import { Link } from "react-router-dom";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";
import UserAuthentication from "./UserAuthentication";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    document.addEventListener(
      "pageHasChanged",
      e => {
        this.setState({
          message: "You are in the " + e.detail.pageTitle + " page"
        });
      },
      false
    );

    document.addEventListener(
      "logOff",
      e => {
        this.props.history.push("/");
      },
      false
    );
  }

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
              <li className="nav-item ml-2">{this.state.message}</li>
            </ul>
          </div>
          <UserAuthentication />
        </nav>
        <nav className="navbar sidenav">
          <ul className="navbar-nav">
            <li className="nav-item homepage">
              <Link className="nav-link" to="/home">
                Homepage
              </Link>
            </li>
            <IfAuthenticated>
              <li className="nav-item">
                <Link className="nav-link" to="/addrecipe">
                  Add Recipe
                </Link>
              </li>
            </IfAuthenticated>
            <li className="nav-item">
              <Link className="nav-link" to="/listrecipes/">
                Recipes List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search/">
                Search By Ingredients
              </Link>
            </li>
            <IfNotAuthenticated></IfNotAuthenticated>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
