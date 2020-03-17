import React from "react";
import { Link } from "react-router-dom";
import { logOff, getDecodedToken } from "authenticare/client";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
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
    this.setState({
      message : ""
    })
    this.props.history.push("/signin");
  };

  handleMessage = (e) => {
    console.log(e.target.name)
    this.setState({
      message : "You are in the " + e.target.name + " page"
    })
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
            <li className="nav-item" >
              <Link className="nav-link" to="/home" name="Home" onClick={this.handleMessage}>
                Homepage
              </Link>
            </li>
            <IfAuthenticated>
              <li className="nav-item">
                <Link className="nav-link" to="/addrecipe" name="Add Recipe" onClick={this.handleMessage}>
                  Add Recipe
                </Link>
              </li>
            </IfAuthenticated>
            <li className="nav-item">
              <Link className="nav-link" to="/listrecipes/" name="Recipes List" onClick={this.handleMessage}>
                Recipes List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search/" name="Search by Ingredients" onClick={this.handleMessage}>
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
