import React from "react";

class Validator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessages: [],
      isValid: true
    };

    /*
    this.props.rules = [
        {
            conditional: () => {return boolean},
            errorMessage: "blahBlah"
        }
    ]
    */
  }

  showError = errorMessage => {
    let errorMessages = [];
    errorMessages.push(errorMessage);

    this.setState({
      isValid: false,
      errorMessages
    });
  };

  validate = () => {
    let isValid = true;
    let errorMessages = [];

    for (let i = 0; i < this.props.rules.length; i++) {
      let rule = this.props.rules[i];
      if (!rule.conditional()) {
        isValid = false;
        errorMessages.push(rule.errorMessage);
      }
    }

    this.setState({
      isValid,
      errorMessages
    });
    return isValid;
  };

  render() {
    return (
      <>
        {!this.state.isValid ? (
          <div className="form-group row m-2">
            <div>
              <ul>
                {this.state.errorMessages.map((msg, i) => {
                  return <li style={{color: "red"}} key={i}>{msg}</li>;
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Validator;
