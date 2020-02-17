import React from "react";
import { Link } from "react-router-dom";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="Homepage-jsx-component">
        <nav className="navbar">
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
            <IfNotAuthenticated>
            </IfNotAuthenticated>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Homepage;
