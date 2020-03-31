import React from "react";

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let event = new CustomEvent("pageHasChanged", {detail: {pageTitle : "Home"}})
    document.dispatchEvent(event)
  }

  render() {
    return (
      <div id="Homepage-jsx-component">
      </div>
    );
  }
}

export default Homepage;
