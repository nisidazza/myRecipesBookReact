import React from "react";
import { Link } from "react-router-dom";

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
              <Link className="nav-link" to="/recipes/list">
                Recipes List
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Add Recipe
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Search
              </a>
            </li>
          </ul>
        </nav>
        {/* <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="input-group">
                                <input className="form-control border-secondary py-2" type="text" placeholder="search" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
    );
  }
}

export default Homepage;
