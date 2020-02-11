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
          <IfAuthenticated>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link not-active" to="#">
                  Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recipes/list">
                  Recipes List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recipes/add">
                  Add Recipe
                </Link>
              </li>
            </ul>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link not-active" href="#">
                  Search
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/recipes/list">
                  Recipes List
                </Link>
              </li>
            </ul>
          </IfNotAuthenticated>
        </nav>
      </div>
    );
  }
}

export default Homepage;
