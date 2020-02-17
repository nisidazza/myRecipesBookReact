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
        <h1>Welcome!</h1>
      </div>
    );
  }
}

export default Homepage;
